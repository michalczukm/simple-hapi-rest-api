const STORAGE = {
  'lists': [
    {
      'id': 1,
      'title': 'My first list',
      'purpose': 'Test list',
      'userId': 1
    },
    {
      'id': 2,
      'title': 'Languages to learn',
      'purpose': 'Improve my coding skills',
      'userId': 1
    },
    {
      'id': 3,
      'title': 'People to call today',
      'purpose': 'Just remember about calling them!',
      'userId': 2
    },
    {
      'id': 4,
      'title': 'People to schedule meeting',
      'purpose': 'Remember - place them in your calendar!',
      'userId': 2
    }
  ],
  'users': [
    {
      'id': 1,
      'username': 'michalczukm'
    },
    {
      'id': 2,
      'username': 'kowalskim'
    },
    {
      'id': 3,
      'username': 'nowakp'
    }
  ],
  'items': [
    {
      'id': 1,
      'content': 'Test item 1',
      'listId': 1
    },
    {
      'id': 2,
      'content': 'Test item 2',
      'listId': 1
    },
    {
      'id': 3,
      'content': 'Test item 3',
      'listId': 1
    },
    {
      'id': 4,
      'content': 'ELM',
      'listId': 2
    },
    {
      'id': 5,
      'content': 'Elixir',
      'listId': 2
    },
    {
      'id': 6,
      'content': 'GO',
      'listId': 2
    },
    {
      'id': 7,
      'content': 'Scala',
      'listId': 2
    }
  ]
};

module.exports = STORAGE;
