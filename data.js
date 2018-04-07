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
    },
    {
      'id': 5,
      'title': 'Things to do tomorrow',
      'purpose': `It's always better to write things down!`,
      'userId': 3
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
    },
    {
      'id': 8,
      'content': 'Michał Michalczuk - remember to call him',
      'listId': 3
    },
    {
      'id': 9,
      'content': 'Adam Nowal - we have important stuff to discuss',
      'listId': 3
    },
    {
      'id': 10,
      'content': 'Kowalski - meeting about new application requirement',
      'listId': 4
    },
    {
      'id': 11,
      'content': 'Marciniak - grab a beer or two, important networking meeting',
      'listId': 4
    },
    {
      'id': 12,
      'content': 'Prepare for REST API classes',
      'listId': 5
    },
    {
      'id': 13,
      'content': 'Create new repo with presentation and excercises',
      'listId': 5
    },
    {
      'id': 14,
      'content': 'Buy train ticket to Warsaw',
      'listId': 5
    },
    {
      'id': 15,
      'content': 'Schedule meeting with Kowalski to discuss new requirements for our mobile app',
      'listId': 5
    },
  ]
};

module.exports = STORAGE;
