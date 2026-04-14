import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, of, pipe, switchMap, tap } from 'rxjs';
import { patchState, signalStore, withMethods, withProps, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { IOpportunity } from '../../../shared/models';

interface OpportunityState {
  isLoading: boolean;
  opportunity: IOpportunity | null;
}

export const OpportunityStore = signalStore(
  withState<OpportunityState>({
    isLoading: false,
    opportunity: null
  }),
  withProps(() => ({
    _http: inject(HttpClient)
  })),
  withMethods(({ _http, ...store }) => ({
    load: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { isLoading: true, opportunity: null })),
        switchMap((slug) =>
          _http.get<{ data: IOpportunity }>(`opportunities/by-slug/${slug}`).pipe(
            tap(({ data }) => patchState(store, { isLoading: false, opportunity: data })),
            catchError(() => {
              patchState(store, { isLoading: false, opportunity: null });
              return of(null);
            })
          )
        )
      )
    )
  }))
);
