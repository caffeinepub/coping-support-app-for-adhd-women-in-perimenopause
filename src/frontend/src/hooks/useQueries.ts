import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { useInternetIdentity } from './useInternetIdentity';
import type { UserProfile, CopingMechanism, CopingCategory, DailyCheckIn, JournalEntry, SavedItem } from '../backend';

// User Profile
export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

// Coping Mechanisms
export function useGetCopingMechanisms() {
  const { actor, isFetching } = useActor();

  return useQuery<CopingMechanism[]>({
    queryKey: ['copingMechanisms'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCopingMechanisms();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetCopingMechanismsByCategory(category: CopingCategory | null) {
  const { actor, isFetching } = useActor();

  return useQuery<CopingMechanism[]>({
    queryKey: ['copingMechanisms', category],
    queryFn: async () => {
      if (!actor) return [];
      if (!category) return actor.getCopingMechanisms();
      return actor.getCopingMechanismsByCategory(category);
    },
    enabled: !!actor && !isFetching,
  });
}

// Prompts
export function useGetPrompts() {
  const { actor, isFetching } = useActor();

  return useQuery<string[]>({
    queryKey: ['prompts'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPrompts();
    },
    enabled: !!actor && !isFetching,
  });
}

// Daily Check-ins
export function useGetDailyCheckIns() {
  const { actor, isFetching } = useActor();
  const { identity } = useInternetIdentity();

  return useQuery<DailyCheckIn[]>({
    queryKey: ['dailyCheckIns', identity?.getPrincipal().toString()],
    queryFn: async () => {
      if (!actor || !identity) return [];
      return actor.getDailyCheckIns(identity.getPrincipal());
    },
    enabled: !!actor && !isFetching && !!identity,
  });
}

export function useAddDailyCheckIn() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (checkIn: Omit<DailyCheckIn, 'id'>) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addDailyCheckIn({ ...checkIn, id: BigInt(0) });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dailyCheckIns'] });
    },
  });
}

// Journal Entries
export function useGetJournalEntries() {
  const { actor, isFetching } = useActor();
  const { identity } = useInternetIdentity();

  return useQuery<JournalEntry[]>({
    queryKey: ['journalEntries', identity?.getPrincipal().toString()],
    queryFn: async () => {
      if (!actor || !identity) return [];
      return actor.getJournalEntries(identity.getPrincipal());
    },
    enabled: !!actor && !isFetching && !!identity,
  });
}

export function useAddJournalEntry() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (entry: Omit<JournalEntry, 'id'>) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addJournalEntry({ ...entry, id: BigInt(0) });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['journalEntries'] });
    },
  });
}

// Saved Items
export function useGetSavedItems() {
  const { actor, isFetching } = useActor();
  const { identity } = useInternetIdentity();

  return useQuery<SavedItem[]>({
    queryKey: ['savedItems', identity?.getPrincipal().toString()],
    queryFn: async () => {
      if (!actor || !identity) return [];
      return actor.getSavedItems(identity.getPrincipal());
    },
    enabled: !!actor && !isFetching && !!identity,
  });
}

export function useAddCopingMechanismToSaved() {
  const { actor } = useActor();
  const { identity } = useInternetIdentity();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (mechanismId: bigint) => {
      if (!actor || !identity) throw new Error('Actor or identity not available');
      return actor.addCopingMechanismToSaved(identity.getPrincipal(), BigInt(0), mechanismId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['savedItems'] });
    },
  });
}

export function useAddTopicToSaved() {
  const { actor } = useActor();
  const { identity } = useInternetIdentity();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (topicId: bigint) => {
      if (!actor || !identity) throw new Error('Actor or identity not available');
      return actor.addCategoryToSaved(identity.getPrincipal(), BigInt(0), topicId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['savedItems'] });
    },
  });
}
