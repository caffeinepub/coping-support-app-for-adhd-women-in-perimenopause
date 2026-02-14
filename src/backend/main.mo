import Map "mo:core/Map";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Text "mo:core/Text";
import Set "mo:core/Set";
import List "mo:core/List";
import Nat "mo:core/Nat";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  // Initialize the access control state
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type UserProfile = {
    name : Text;
  };

  public type CopingCategory = {
    #Focus;
    #EmotionalRegulation;
    #Sleep;
    #HotFlashes;
    #BrainFog;
    #Anxiety;
    #Relationships;
    #Work;
    #SelfCare;
  };

  public type CopingMechanism = {
    id : Nat;
    title : Text;
    description : Text;
    category : CopingCategory;
    isHolistic : Bool;
    hasEvidence : Bool;
    notes : Text;
  };

  public type DailyCheckIn = {
    id : Nat;
    date : Time.Time;
    focus : Nat;
    mood : Nat;
    energy : Nat;
    sleepQuality : Nat;
    hotFlashSeverity : Nat;
    anxiety : Nat;
    irritability : Nat;
    notes : ?Text;
  };

  public type JournalEntry = {
    id : Nat;
    date : Time.Time;
    prompt : ?Text;
    entry : Text;
  };

  public type SavedItemType = {
    #CopingMechanism;
    #Topic;
  };

  public type SavedItem = {
    id : Nat;
    itemType : SavedItemType;
    referenceId : Nat;
  };

  module CopingMechanism {
    public func compare(coping1 : CopingMechanism, coping2 : CopingMechanism) : Order.Order {
      Nat.compare(coping1.id, coping2.id);
    };
  };

  module DailyCheckIn {
    public func compare(checkin1 : DailyCheckIn, checkin2 : DailyCheckIn) : Order.Order {
      Nat.compare(checkin1.id, checkin2.id);
    };
  };

  module JournalEntry {
    public func compare(entry1 : JournalEntry, entry2 : JournalEntry) : Order.Order {
      Nat.compare(entry1.id, entry2.id);
    };
  };

  module SavedItem {
    public func compare(item1 : SavedItem, item2 : SavedItem) : Order.Order {
      Nat.compare(item1.id, item2.id);
    };
  };

  let userProfiles = Map.empty<Principal, UserProfile>();
  let copingMechanismIdCounter = Map.empty<Principal, Nat>();
  var dailyCheckInIdCounter = 0;
  let journalEntryIdCounter = Map.empty<Principal, Nat>();
  let savedItemIdCounter = Map.empty<Principal, Nat>();

  let copingMechanisms = List.fromArray<CopingMechanism>([
    {
      id = 1;
      title = "Deep Breathing";
      description = "Practice deep breathing exercises to manage stress and anxiety.";
      category = #EmotionalRegulation;
      isHolistic = true;
      hasEvidence = true;
      notes = "Recommended for immediate relief.";
    },
    {
      id = 2;
      title = "Mindfulness Meditation";
      description = "Engage in mindfulness meditation to improve focus and reduce anxiety.";
      category = #Focus;
      isHolistic = true;
      hasEvidence = true;
      notes = "Practice daily for best results.";
    },
  ]);

  let dailyCheckIns = Map.empty<Principal, List.List<DailyCheckIn>>();
  let journalEntries = Map.empty<Principal, List.List<JournalEntry>>();
  let savedItems = Map.empty<Principal, List.List<SavedItem>>();

  let prompts = List.fromArray([
    "What felt hardest today?",
    "What helped even a little?",
    "What's one kind thing I can do for myself?",
  ]);

  // User Profile Management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Public read-only access to general content (no authentication required)
  public query ({ caller }) func getCopingMechanisms() : async [CopingMechanism] {
    copingMechanisms.toArray();
  };

  public query ({ caller }) func getCopingMechanismsByCategory(category : CopingCategory) : async [CopingMechanism] {
    copingMechanisms.filter(func(mech) { mech.category == category }).toArray();
  };

  public query ({ caller }) func getPrompts() : async [Text] {
    prompts.toArray();
  };

  // User-specific data access (requires authentication and ownership verification)
  public query ({ caller }) func getDailyCheckIns(user : Principal) : async [DailyCheckIn] {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only access your own check-ins");
    };
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can access check-ins");
    };
    switch (dailyCheckIns.get(user)) {
      case (?entries) { entries.toArray() };
      case (null) { [] };
    };
  };

  public query ({ caller }) func getJournalEntries(user : Principal) : async [JournalEntry] {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only access your own journal entries");
    };
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can access journal entries");
    };
    switch (journalEntries.get(user)) {
      case (?entries) { entries.toArray() };
      case (null) { [] };
    };
  };

  public query ({ caller }) func getSavedItems(user : Principal) : async [SavedItem] {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only access your own saved items");
    };
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can access saved items");
    };
    switch (savedItems.get(user)) {
      case (?items) { items.toArray() };
      case (null) { [] };
    };
  };

  // User-specific data modification (requires authentication)
  public shared ({ caller }) func addDailyCheckIn(checkIn : DailyCheckIn) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can add check-ins");
    };

    let user = caller;
    let newCheckIn = { checkIn with id = dailyCheckInIdCounter };
    dailyCheckInIdCounter += 1;

    let existingCheckIns = switch (dailyCheckIns.get(user)) {
      case (?entries) { entries };
      case (null) { List.empty<DailyCheckIn>() };
    };

    existingCheckIns.add(newCheckIn);
    dailyCheckIns.add(user, existingCheckIns);
  };

  public shared ({ caller }) func addJournalEntry(entry : JournalEntry) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can add journal entries");
    };

    let user = caller;
    let currentId = switch (journalEntryIdCounter.get(user)) {
      case (?id) { id };
      case (null) { 1 };
    };

    let newEntry = { entry with id = currentId };
    journalEntryIdCounter.add(user, currentId + 1);

    let existingEntries = switch (journalEntries.get(user)) {
      case (?entries) { entries };
      case (null) { List.empty<JournalEntry>() };
    };

    existingEntries.add(newEntry);
    journalEntries.add(user, existingEntries);
  };

  public shared ({ caller }) func addCopingMechanismToSaved(user : Principal, itemId : Nat, mechanismId : Nat) : async () {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only modify your own saved items");
    };
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can save items");
    };

    let currentId = switch (savedItemIdCounter.get(user)) {
      case (?id) { id };
      case (null) { 1 };
    };

    let newSavedItem = {
      id = currentId;
      itemType = #CopingMechanism;
      referenceId = mechanismId;
    };

    savedItemIdCounter.add(user, currentId + 1);

    let existingSavedItems = switch (savedItems.get(user)) {
      case (?items) { items };
      case (null) { List.empty<SavedItem>() };
    };

    existingSavedItems.add(newSavedItem);
    savedItems.add(user, existingSavedItems);
  };

  public shared ({ caller }) func addCategoryToSaved(user : Principal, itemId : Nat, categoryId : Nat) : async () {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only modify your own saved items");
    };
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can save items");
    };

    let currentId = switch (savedItemIdCounter.get(user)) {
      case (?id) { id };
      case (null) { 1 };
    };

    let newSavedItem = {
      id = currentId;
      itemType = #Topic;
      referenceId = categoryId;
    };

    savedItemIdCounter.add(user, currentId + 1);

    let existingSavedItems = switch (savedItems.get(user)) {
      case (?items) { items };
      case (null) { List.empty<SavedItem>() };
    };

    existingSavedItems.add(newSavedItem);
    savedItems.add(user, existingSavedItems);
  };
};
