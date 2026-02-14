import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface JournalEntry {
    id: bigint;
    date: Time;
    entry: string;
    prompt?: string;
}
export interface DailyCheckIn {
    id: bigint;
    focus: bigint;
    hotFlashSeverity: bigint;
    sleepQuality: bigint;
    irritability: bigint;
    anxiety: bigint;
    date: Time;
    mood: bigint;
    notes?: string;
    energy: bigint;
}
export interface CopingMechanism {
    id: bigint;
    title: string;
    description: string;
    hasEvidence: boolean;
    notes: string;
    category: CopingCategory;
    isHolistic: boolean;
}
export interface SavedItem {
    id: bigint;
    referenceId: bigint;
    itemType: SavedItemType;
}
export interface UserProfile {
    name: string;
}
export enum CopingCategory {
    SelfCare = "SelfCare",
    Relationships = "Relationships",
    Sleep = "Sleep",
    HotFlashes = "HotFlashes",
    EmotionalRegulation = "EmotionalRegulation",
    Work = "Work",
    Focus = "Focus",
    BrainFog = "BrainFog",
    Anxiety = "Anxiety"
}
export enum SavedItemType {
    CopingMechanism = "CopingMechanism",
    Topic = "Topic"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addCategoryToSaved(user: Principal, itemId: bigint, categoryId: bigint): Promise<void>;
    addCopingMechanismToSaved(user: Principal, itemId: bigint, mechanismId: bigint): Promise<void>;
    addDailyCheckIn(checkIn: DailyCheckIn): Promise<void>;
    addJournalEntry(entry: JournalEntry): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCopingMechanisms(): Promise<Array<CopingMechanism>>;
    getCopingMechanismsByCategory(category: CopingCategory): Promise<Array<CopingMechanism>>;
    getDailyCheckIns(user: Principal): Promise<Array<DailyCheckIn>>;
    getJournalEntries(user: Principal): Promise<Array<JournalEntry>>;
    getPrompts(): Promise<Array<string>>;
    getSavedItems(user: Principal): Promise<Array<SavedItem>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
}
