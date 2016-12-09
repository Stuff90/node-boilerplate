# Pmu Vitrine

## Installation

#### Download node modules

Run the following `cmd`:
```bash
npm install
```

#### Download bower dependencies

Run the following `cmd`:
```bash
bower install
```
If permission errors then run `cmd`:
```bash
sudo bower install --allow-root
```

#### Development environement
Run the following `cmd` to start node server, front and watch project:
```bash
gulp
```
If restart node server is needed run `cmd` in same terminal:
```bash
rs
```
#### Git nomenclature
```bash
(scope_app)[scope:techno1|techno2|...] Jira-ticket > message
```

## Documentation

### Server

#### API Routes

```
/api/race

@parameters
    idRace         : integer
    idReunion      : integer
    ( date         : string 'DDMMYYYY' )
    ( participants : integer ['0','1'] )
```
Return the race data for a reunion & a race id.

```
/api/program

@parameters
    ( date         : string 'DDMMYYYY' )
```
Return the program data for a date.
