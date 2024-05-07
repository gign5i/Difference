### Hexlet tests and linter status:
[![Actions Status](https://github.com/gign5i/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/gign5i/frontend-project-46/actions)

<a href="https://codeclimate.com/github/gign5i/frontend-project-46/maintainability"><img src="https://api.codeclimate.com/v1/badges/f18ae74f5763c98f0dbe/maintainability" /></a>

<a href="https://codeclimate.com/github/gign5i/frontend-project-46/test_coverage"><img src="https://api.codeclimate.com/v1/badges/f18ae74f5763c98f0dbe/test_coverage" /></a>

Установка:
- При первом клонировании проекта необходимо ввести команду:
  `make install`

Запуск:
- Можно ознакомиться с описанием, указав следующую команду:
  `gendiff -h`:
  ```
  Usage: gendiff [options] <firstFilePath> <secondFilePath>

  Compares two configuration files and shows a difference.

  Options:
    -V, --version        output the version number
    -f, --format [type]  output format (default: "JSON")
    -h, --help           display help for command
  ```
- Для запуска необходимо вводить следующую команду:
  `gendiff -f <format> <filepath1> <filepath2>`

  `<format>` может иметь следующие допустимые значения:
  - `stylish`:
  ```
  >gendiff -f stylish <filepath-1> <filepath-2>

  {
    - follow: false
      host: hexlet.io
    - proxy: 123.234.53.22
    - timeout: 50
    + timeout: 20
    + verbose: true
  }
  ```
  - `plain`:
  ```
  >gendiff -f plain <filepath-1> <filepath-2>

  Property 'follow' was removed
  Property 'proxy' was removed
  Property 'timeout' was updated. From 50 to 20
  Property 'verbose' was added with value: true
  ```
  - `json`:
  ```
  >gendiff -f json <filepath-1> <filepath-2>
  or
  >>gendiff <filepath-1> <filepath-2>
  [
    {
      "name": "follow",
      "type": "deleted",
      "value": false
    },
    {
      "name": "host",
      "type": "unchanged",
      "value": "hexlet.io"
    },
    {
      "name": "proxy",
      "type": "deleted",
      "value": "123.234.53.22"
    },
    {
      "name": "timeout",
      "type": "changed",
      "value1": 50,
      "value2": 20
    },
    {
      "name": "verbose",
      "type": "added",
      "value": true
    }
  ]
  ```
  - Если не указать формат вывода, то по умолчанию результат будет выводиться в формате `JSON`.

asciinema (4-th step):
https://asciinema.org/a/hGRFrlNTehe22arG4x3LDnHT3

asciinema (6-th step):
https://asciinema.org/a/IZS9CqHLIWI3pChHtQX0hRekH

asciinema (8-th step):
https://asciinema.org/a/ZncC8pykHICaKBG1jlikAnQp3

asciinema (9-th step):
https://asciinema.org/a/eZ0BOeIT5021IHwWgUC0d9sQv
