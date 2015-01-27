;(function ( window, document, rd ) {

    !rd && (window['rd'] = rd = {});

    // define rd.log(), rd.warn(), rd.error(), rd.debug(), rd.info()
    ['log','warn','error','debug','info'].forEach(function(m){
        rd[m] = function () {
            return window.console && m in console &&
                Function.apply.call(console[m], console, arguments);
        }
    });

})( window, document, window['rd'] );
