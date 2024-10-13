import Bool "mo:base/Bool";

import Array "mo:base/Array";
import Debug "mo:base/Debug";
import Int "mo:base/Int";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Text "mo:base/Text";

actor {
  // Define the structure for an upcycled clothing project
  public type Project = {
    id: Nat;
    title: Text;
    description: Text;
    materials: [Text];
    upvotes: Nat;
    downvotes: Nat;
  };

  // Store projects in a stable variable
  stable var projects : [Project] = [];
  stable var nextId : Nat = 0;

  // Add a new project
  public func addProject(title: Text, description: Text, materials: [Text]) : async Nat {
    let id = nextId;
    nextId += 1;

    let newProject : Project = {
      id;
      title;
      description;
      materials;
      upvotes = 0;
      downvotes = 0;
    };

    projects := Array.append(projects, [newProject]);
    Debug.print("New project added: " # debug_show(newProject));
    id
  };

  // Get all projects
  public query func getAllProjects() : async [Project] {
    projects
  };

  // Upvote a project
  public func upvoteProject(id: Nat) : async Bool {
    let projectIndex = Array.indexOf<Project>({ id = id; title = ""; description = ""; materials = []; upvotes = 0; downvotes = 0; }, projects, func(a, b) { a.id == b.id });
    
    switch (projectIndex) {
      case (?index) {
        let updatedProject = {
          id = projects[index].id;
          title = projects[index].title;
          description = projects[index].description;
          materials = projects[index].materials;
          upvotes = projects[index].upvotes + 1;
          downvotes = projects[index].downvotes;
        };
        projects := Array.tabulate(projects.size(), func (i : Nat) : Project {
          if (i == index) { updatedProject } else { projects[i] }
        });
        true
      };
      case null { false };
    }
  };

  // Downvote a project
  public func downvoteProject(id: Nat) : async Bool {
    let projectIndex = Array.indexOf<Project>({ id = id; title = ""; description = ""; materials = []; upvotes = 0; downvotes = 0; }, projects, func(a, b) { a.id == b.id });
    
    switch (projectIndex) {
      case (?index) {
        let updatedProject = {
          id = projects[index].id;
          title = projects[index].title;
          description = projects[index].description;
          materials = projects[index].materials;
          upvotes = projects[index].upvotes;
          downvotes = projects[index].downvotes + 1;
        };
        projects := Array.tabulate(projects.size(), func (i : Nat) : Project {
          if (i == index) { updatedProject } else { projects[i] }
        });
        true
      };
      case null { false };
    }
  };
}
