// david.bielik@oracle.com
(function(globalVariable) {
    var proxyUrl = window.mmproxy && window.mmproxy.proxyHost;
    var configurations = {
        us: {
            baseContentUrl: '//service.maxymiser.net/platform/us/api/',
            srv: '//service.maxymiser.net/cg/v5us/?',
            instance: 'us'
        },
        eu: {
            baseContentUrl: '//service.maxymiser.net/platform/eu/api/',
            srv: '//service.maxymiser.net/cg/v5/?',
            instance: 'eu'
        },
        dev: {
            baseContentUrl: '//service-dev.mvtresearch.net/platform/eu/api/',
            srv: '//service-dev.mvtresearch.net/cg/v5/?',
            instance: 'dev'
        }
    };

    switch(proxyUrl) 
    {
        case 'proxy-us.maxymiser.com':
        case 'us.oraprod-mmproxy.com':
        defaults = configurations.us;
        break;

        case 'proxy-eu.maxymiser.com':
        case 'eu.oraprod-mmproxy.com':
        defaults = configurations.eu;
        break;

        case 'proxy-dev.mvtresearch.com':
        defaults = configurations.dev;
        break;

        default:
        defaults = configurations.us;
    }

    window[globalVariable] = angular.extend({
        baseContentUrl: defaults.baseContentUrl,
        srv: defaults.srv,
        domain: location.hash.replace(/#/,'') || location.hostname, // default, or restore, or ?site=
        async: false,
        cookieDomain: location.hostname,
        instance: defaults.instance
    }, restore());

   window.OracleInfinityMutation = function(msg) {
        msg.setParam('demo.instance', window[globalVariable].instance);
        msg.setParam('demo.domain', window[globalVariable].domain);
   };

    angular.module('MaxymiserSettings', [])
        .service('mmapi', function() {
            var mm = window[globalVariable];

            angular.extend(this, {
                get: getConfig,
                set: setConfig,
                getInstance: getInstance,
                clear: clear,
                config: restore(),
                restore: restore,
                save: save
            });

            save(this.config);
            var domain = this.config.domain;

            function getInstance(instance) {
                var instances = {
                    'us': {
                        srv: '//service.maxymiser.net/cg/v5us/?',
                        baseContentUrl: '//service.maxymiser.net/platform/us/api/',
                        name: 'US',
                        ui: 'https://ui61us.maxymiser.com'
                    },
                    'eu': {
                        srv: '//service.maxymiser.net/cg/v5/?',
                        baseContentUrl: '//service.maxymiser.net/platform/eu/api/',
                        name: 'EMEA',
                        ui: 'https://ui61.maxymiser.com'
                    },
                    'dev': {
                        srv: '//service-dev.mvtresearch.net/cg/v5/?',
                        baseContentUrl: '//service-dev.mvtresearch.net/platform/eu/api/',
                        name: 'dev',
                        ui: 'https://dev.mvtresearch.com'
                    },
                    'env11': {
                        srv: '//service-env11.mvtresearch.net/cg/v5/?',
                        baseContentUrl: '//service-dev.mvtresearch.net/platform/eu/api/',
                        name: 'env11'
                    }
                };
                if (!instance) {
                    return instances;
                }
                return instances[instance];
            }

            function getConfig(property) {
                if (!property) {
                    return this.config;
                }
                return this.config[property];
            }

            function setConfig(property, value) {
                value = typeof value === 'string' ? value.toLowerCase() : value;
                if (property === 'instance') {
                    var instance = getInstance(value);
                    for (var key in instance) {
                        this.config[key] = instance[key];
                    }
                }
                this.config[property] = value;
                save(this.config);
                return value;
            }

            function clear() {
                localStorage.clear();
            }
        })
        .controller('MaxymiserSettingsController', function(mmapi, $scope, $timeout, $location) {
                $scope.config = {};  
                init();

                function init(){
                        $scope.instances = mmapi.getInstance();
                        $scope.config = mmapi.restore();
                        var params = {};
                        var search = location.search.replace(/^\?/,'').split('&').forEach(function(string){string = string.split('='); params[string[0]] = string[1];});
                        if (params.domain) {
                           $scope.config.domain = mmapi.set('domain', params.domain);
                        }
                        if (params.instance) {
                           $scope.config.instance = mmapi.set('instance', params.instance);
                        }
                        if (params.userId) {
                           $scope.config.userId = mmapi.set('userId', params.userId);
                           localStorage.setItem('userId', '1=' + $scope.config.userId);
                        }
                        if ($location.host().indexOf('proxy-dev.mvtresearch.com') > -1 && $scope.config.instance !== 'dev') {
                            mmapi.set('instance', 'dev');
                            mmapi.save(mmapi.get());
                            $scope.config = mmapi.restore();
                            refresh();
                        }
                        $timeout(function() {
                            if (window.jQuery && window.jQuery.prototype.dropdown) {$('.dropdown-toggle').dropdown();}
                        });
                }
                $scope.close = function(){
                    $('.in,.open').removeClass('in open');
                };
                $scope.submit = function() {
                    mmapi.set('domain', $scope.config.domain);
                    mmapi.set('instance', $scope.config.instance);
                    mmapi.set('userId', $scope.config.userId);
                    localStorage.setItem('userId', '1=' + $scope.config.userId);
                    refresh();
                };
                $scope.clear = function() {
                    mmapi.clear();
                    refresh();
                };

                function refresh() {
                    window.location.reload(true);
                }

        })
        .directive('mmapiSettings', function(mmapi, $timeout) {
            /* jshint multistr: true */
            return {
                restrict: 'E',
                replace: true,
                controller: 'MaxymiserSettingsController',
                template: '\
                  <form ng-controller="MaxymiserSettingsController" class="dropdown-menu" aria-labelledby="mmapi-dropdown" ng-submit="submit()">\
                      <span ng-click="close()" style="cursor:pointer; position:absolute; right:11px; bottom:3px; font-size:13px; text-decoration:underline;">close</span>\
                      <div class="form-group">\
                          <label for="mmapi-domain-input">UI Site</label>\
                          <input id="mmapi-domain-input" type="text" ng-model="config.domain">\
                      </div>\
                      <div class="form-group">\
                          <label for="mmapi-instance-input">Instance</label><br>\
                          <select id="mmapi-instance-input" ng-model="config.instance">\
                              <option ng-repeat="(instance, props) in instances" ng-value="instance" ng-bind="props.name" ng-selected="instance === config.instance"></option>\
                          </select>\
                      </div>\
                      <div class="form-group">\
                          <label for="mmapi-cookie-input">User ID</label>\
                          <input id="mmapi-cookie-input" type="text" ng-model="config.userId">\
                      </div>\
                      <div class="form-group">\
                          <button class="btn btn-success" type="submit" ng-click="submit()">Save</button>\
                          <a class="btn btn-danger" ng-click="clear()">Reset</a>\
                      </div>\
                  </form>'
            };
        });


    function restore() {
        var storage = localStorage.getItem('demo.storage') || '{}';
        try {
            storage = JSON.parse(storage);
            if (localStorage.getItem('userId')) {
                storage.userId = localStorage.getItem('userId').replace(/^1=/,'');
            }
        } catch (e) {
            storage = {};
        }
        for (var key in window[globalVariable]) {
            storage[key] = storage[key] || window[globalVariable][key];
        }
        return storage;
    }

    function save(storage) {
        localStorage.setItem('demo.storage', JSON.stringify(storage));
    }

})('mm');