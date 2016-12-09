var path = require('path'),
    config = require('../config.server'),

    // Controllers

    RaceEntryPoint     = require('./api/race'),
    MaskEntryPoint     = require('./api/mask'),
    ProgramEntryPoint  = require('./api/program'),
    SnapshotEntryPoint = require('./api/snapshot');


// app.get('*', function(req, res) {
//      res.redirect('/#' + req.originalUrl);
// });


exports.all = [
    {
        method: 'get',
        route: '/',
        action: (req, res) => {
            res.sendFile( path.join( config.ROOT_DIR, 'client', 'dist', 'index.html'));
        },
    },{
        method: 'get',
        route: '/api/program',
        action: ProgramEntryPoint.get,
    },{
        method: 'get',
        route: '/api/race',
        action: RaceEntryPoint.get,
    },{
        method: 'get',
        route: '/api/masks',
        action: MaskEntryPoint.list,
    },{
        method: 'post',
        route: '/api/snapshot',
        action: SnapshotEntryPoint.save,
    }
];
