import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProjectStore } from '../../../../projects/store/project.store';
import { ParticipationsStore } from '../../../store/participations.store';
import { DeliverablesStore } from '../../../store/deliverables.store';
import { ToastrService } from '@core/services/toast/toastr.service';
import { IPhase } from '@shared/models/entities.models';
import { DELIVERABLE_UPLOAD } from '../../../config/deliverable-upload.config';
import {
  Calendar,
  Check,
  ChevronDown,
  ChevronRight,
  FileText,
  LucideAngularModule,
  Lock,
  Paperclip,
  Play,
  Rocket,
  Timer,
  Upload
} from 'lucide-angular';

@Component({
  selector: 'app-program-roadmap',
  imports: [CommonModule, RouterLink, LucideAngularModule],
  providers: [ProjectStore],
  templateUrl: './program-roadmap.html'
})
export class ProgramRoadmap implements OnInit {
  route = inject(ActivatedRoute);
  projectStore = inject(ProjectStore);
  participationsStore = inject(ParticipationsStore);
  deliverablesStore = inject(DeliverablesStore);
  toastr = inject(ToastrService);
  uploadMaxLabel = DELIVERABLE_UPLOAD.maxLabel;

  expandedPhases = signal<Record<string, boolean>>({});
  selectedFiles = signal<Record<string, File>>({});

  icons = {
    attach: Paperclip,
    calendar: Calendar,
    check: Check,
    chevronDown: ChevronDown,
    chevronRight: ChevronRight,
    description: FileText,
    lock: Lock,
    play: Play,
    publish: Upload,
    rocket: Rocket,
    timelapse: Timer
  };

  orderedPhases = computed(() => {
    return this.projectStore.project()?.phases ?? [];
  });

  currentParticipation = computed(() => {
    const project = this.projectStore.project();
    if (!project) return null;
    return this.participationsStore.participations().find((p) => p.project?.id === project.id);
  });

  completedPhaseIds = computed(() => {
    const participation = this.currentParticipation();
    return new Set(participation?.phases?.map((p) => p.id) ?? []);
  });

  ngOnInit(): void {
    const slug = this.route.snapshot.params['slug'];
    this.projectStore.loadProject(slug);
    this.participationsStore.myParticipations();
  }

  togglePhase(phaseId: string): void {
    this.expandedPhases.update((prev) => ({
      ...prev,
      [phaseId]: !prev[phaseId]
    }));
  }

  isPhaseExpanded(phaseId: string): boolean {
    return this.expandedPhases()[phaseId] ?? false;
  }

  isPhaseCompleted(phaseId: string): boolean {
    return this.completedPhaseIds().has(phaseId);
  }

  isPhaseActive(phase: IPhase): boolean {
    const now = new Date();
    return new Date(phase.started_at) <= now && new Date(phase.ended_at) >= now;
  }

  hasDeliverable(phase: IPhase): boolean {
    return !!phase.deliverables?.length;
  }

  canSubmitPhase(phase: IPhase): boolean {
    if (!this.hasDeliverable(phase)) return false;
    if (!this.isPhaseActive(phase)) return false;
    return !this.isPhaseCompleted(phase.id);
  }

  onFileSelected(phaseId: string, event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    this.selectedFiles.update((prev) => ({ ...prev, [phaseId]: file }));
  }

  submitDeliverable(phase: IPhase): void {
    const project = this.projectStore.project();
    const participation = this.currentParticipation();
    const file = this.selectedFiles()[phase.id];
    const deliverableId = phase.deliverables?.[0]?.id;

    if (!project || !participation || !file || !deliverableId) return;
    if (!this.isPhaseActive(phase)) {
      this.toastr.showError('Soumission impossible : la phase est hors période.');
      return;
    }
    if (this.isPhaseCompleted(phase.id)) {
      this.toastr.showError('Soumission impossible : vous avez déjà soumis pour cette phase.');
      return;
    }
    if (file.type !== 'application/pdf') {
      this.toastr.showError('Seuls les fichiers PDF sont acceptés.');
      return;
    }
    if (file.size > DELIVERABLE_UPLOAD.maxBytes) {
      this.toastr.showError(`Taille max : ${DELIVERABLE_UPLOAD.maxLabel}.`);
      return;
    }

    this.deliverablesStore.submitDeliverable({
      programId: project.id,
      participationId: participation.id,
      phaseId: phase.id,
      deliverableId,
      file
    });

    this.selectedFiles.update((prev) => {
      const next = { ...prev };
      delete next[phase.id];
      return next;
    });
  }

  isPhaseFuture(phase: IPhase): boolean {
    return new Date(phase.started_at) > new Date();
  }

  getPhaseStatus(phase: IPhase): 'completed' | 'active' | 'future' | 'past' {
    if (this.isPhaseCompleted(phase.id)) return 'completed';
    if (this.isPhaseActive(phase)) return 'active';
    if (this.isPhaseFuture(phase)) return 'future';
    return 'past';
  }

  getStatusIcon(status: 'completed' | 'active' | 'future' | 'past') {
    switch (status) {
      case 'completed':
        return this.icons.check;
      case 'active':
        return this.icons.play;
      case 'future':
        return this.icons.calendar;
      default:
        return this.icons.lock;
    }
  }
}
