(function() {

    var app = angular.module('shopApp', ['MaxymiserSettings']);


    /* directives */
    /*app.directive('settingsMenu', function($location) {
        return {
            templateUrl: '/angular/settings-menu.html',
            restrict: 'E',
            replace: true,
            link: function($scope, $element) {
								// @todo - URL parameters are read async here so need to move this logic elsewhere...
                var datalayer = window.datalayer || {};
                $scope.uiSite = $location.search()['ui-site'] || localStorage.getItem('ui-site') || 'shop.maxymised.com';
                $scope.uiServer = $location.search()['ui-server'] || localStorage.getItem('ui-server') || 'service.maxymiser.net/cg/v5us/';
                $scope.tagManager = $location.search()['tag-manager'] || localStorage.getItem('tag-manager') || 'ensighten';
                $scope.visitorId = $location.search()['visitor-id'] || localStorage.getItem('visitor-id') || 'idnv802n';
								$scope.isMmcore = localStorage.getItem('isMmcore') === 'true' ? true : false;

                $element.find('button').css('text-align', 'left');

                $element.find('#mm-enable-qa').click(enableQaTool);
                $element.find('#mm-ui-site').click(changeUiSite);
                $element.find('#mm-ui-server').click(changeUiServer);
                $element.find('#mm-tag-manager').click(changeTagManager);
								$element.find('#mm-visitor-id').click(changeVisitorId);
								$element.find('#mm-clear-cookies').click(clearCookies);
								$element.find('#mm-switch-mmcore').click(switchMmcore);
								$element.find('#mm-launch-vcb').click(launchVcb);
                // launch QA
                function enableQaTool() {
                    mmsystem.enableUtility('qa');
                    $location.search('mmcore.un', null);
                    $scope.$apply();
                    location.reload(true);
                }

                // Change UI Site
                function changeUiSite() {
                    var site = prompt('Enter your UI site name', datalayer.uisite);
                    if (!site) {
                        return;
                    }
                    localStorage.setItem('ui-site', site);
										clearMaxymiserId();
                    location.reload(true);
                }

                // Change CG Server
                function changeUiServer() {
                    var map = {
                        ui61: 'service.maxymiser.net/cg/v5/',
                        demo: 'cg-demo.maxymiser.org/demo/',
                        ui61us: 'service.maxymiser.net/cg/v5us/',
                        vcb: 'service.maxymiser.qa/cg/cg/',
												ad: 'service.maxymiser.qa/cg/ad/ContentManager.ashx',
												devys: 'origin-cg-ys.mvtresearch.net/v5/'
                    };
										localStorage.removeItem('ui-base-content-url');
                    var choices = Object.keys(map).join(',');
                    var server = prompt('Enter the UI Instance name [' + choices + ']');
                    if (!server) {
                        return;
                    }
                    if (!map.hasOwnProperty(server)) {
                        return alert('Invalid server');
                    }
                    localStorage.setItem('ui-server', map[server]);
										localStorage.setItem('ui-srv', '//' + map[server] + '?');
										if (server === 'ad') {
												localStorage.setItem('ui-base-content-url', '//service.maxymiser.qa/platform/api/');
										}
										clearMaxymiserId();
                    location.reload(true);
                }

                function changeTagManager() {
                    localStorage.setItem('tag-manager', localStorage.getItem('tag-manager') === 'tealium' ? 'ensighten' : 'tealium');
                    location.reload(true);
                }

								function changeVisitorId(){
										var visitorId = prompt('Enter your visitor ID', $scope.visitorId || '');
										if (!visitorId) {
												return;
										}
										localStorage.setItem('visitor-id', visitorId);
										location.reload(true);
								}

								function clearCookies(){
										localStorage.removeItem('ui-server');
										localStorage.removeItem('ui-srv');
										localStorage.removeItem('ui-base-content-url');
										sessionStorage.clear();
										clearMaxymiserId();
										location.reload(true);
								}

								function switchMmcore(){
										localStorage.setItem('isMmcore', $scope.isMmcore ? 'false' : 'true');								
									  clearMaxymiserId();
										location.reload(true);
								}

								function clearMaxymiserId(){
									  var cookies = window.Cookies.get() || {};
										for(var key in cookies) {
												if (key.indexOf('mmapi.store.') === 0) {
														deleteCookie(key);
												}
										}
										function deleteCookie(name){
												Cookies.remove(name, {domain: '.shop.maxymised.com'});
										}
								}

								function launchVcb(){
									$.getScript('/angular/vcb.js');
								}
            }
        };
    });
    */

    /* directives */

})();