import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, of, pipe, switchMap, tap } from 'rxjs';
import { patchState, signalStore, withMethods, withProps, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { buildQueryParams } from '../../../shared/helpers/http.helper';
import { IOpportunity } from '../../../shared/models';
import { FilterOpportunitiesDto } from '../dto/filter-opportunities.dto';

interface OpportunitiesState {
  isLoading: boolean;
  opportunities: IOpportunity[];
}

export const OpportunitiesStore = signalStore(
  withState<OpportunitiesState>({
    isLoading: false,
    opportunities: []
  }),
  withProps(() => ({
    _http: inject(HttpClient)
  })),
  withMethods(({ _http, ...store }) => ({
    load: rxMethod<FilterOpportunitiesDto | void>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((query = {}) => {
          const params = buildQueryParams(query ?? {});
          return _http.get<{ data: IOpportunity[] }>('opportunities', { params }).pipe(
            tap(({ data }) => patchState(store, { isLoading: false, opportunities: data ?? [] })),
            catchError(() => {
              patchState(store, { isLoading: false, opportunities: [] });
              return of(null);
            })
          );
        })
      )
    )
  }))
);
