import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Project {
  'id' : bigint,
  'upvotes' : bigint,
  'title' : string,
  'description' : string,
  'materials' : Array<string>,
  'downvotes' : bigint,
}
export interface _SERVICE {
  'addProject' : ActorMethod<[string, string, Array<string>], bigint>,
  'downvoteProject' : ActorMethod<[bigint], boolean>,
  'getAllProjects' : ActorMethod<[], Array<Project>>,
  'upvoteProject' : ActorMethod<[bigint], boolean>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
