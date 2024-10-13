export const idlFactory = ({ IDL }) => {
  const Project = IDL.Record({
    'id' : IDL.Nat,
    'upvotes' : IDL.Nat,
    'title' : IDL.Text,
    'description' : IDL.Text,
    'materials' : IDL.Vec(IDL.Text),
    'downvotes' : IDL.Nat,
  });
  return IDL.Service({
    'addProject' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Vec(IDL.Text)],
        [IDL.Nat],
        [],
      ),
    'downvoteProject' : IDL.Func([IDL.Nat], [IDL.Bool], []),
    'getAllProjects' : IDL.Func([], [IDL.Vec(Project)], ['query']),
    'upvoteProject' : IDL.Func([IDL.Nat], [IDL.Bool], []),
  });
};
export const init = ({ IDL }) => { return []; };
