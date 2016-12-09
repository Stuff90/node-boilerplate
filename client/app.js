angular.module('appName', [
    'ui.router'
])
.config(( $urlRouterProvider , $locationProvider) => {
    $locationProvider.html5Mode(false);
    $urlRouterProvider.otherwise('/');
})
.run(() => {
    console.info('Here comes the sun !');
});
