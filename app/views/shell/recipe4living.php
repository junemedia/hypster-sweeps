<? extract($data); ?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta http-equiv="x-ua-compatible" content="IE=edge"/>
    <script>
        var mobile_domain = "m.recipe4living.com";
        // Set to false to not redirect on iPad.
        var ipad = false;
        // Set to false to not redirect on other tablets (Android , BlackBerry, WebOS tablets).
        var other_tablets = false;
        document.write(unescape("%3Cscript src='" + location.protocol + "//s3.amazonaws.com/me.static/js/me.redirect.min.js' type='text/javascript'%3E%3C/script%3E"));
    </script>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <script>
        window.NREUM || (NREUM = {}), __nr_require = function(n, e, t) {
            function r(t) {
                if (!e[t]) {
                    var o = e[t] = {
                        exports: {}
                    };
                    n[t][0].call(o.exports, function(e) {
                        var o = n[t][1][e];
                        return r(o ? o : e)
                    }, o, o.exports)
                }
                return e[t].exports
            }
            if ("function" == typeof __nr_require) return __nr_require;
            for (var o = 0; o < t.length; o++) r(t[o]);
            return r
        }({
            QJf3ax: [function(n, e) {
                function t(n) {
                    function e(e, t, a) {
                        n && n(e, t, a), a || (a = {});
                        for (var u = c(e), f = u.length, s = i(a, o, r), p = 0; f > p; p++) u[p].apply(s, t);
                        return s
                    }

                    function a(n, e) {
                        f[n] = c(n).concat(e)
                    }

                    function c(n) {
                        return f[n] || []
                    }

                    function u() {
                        return t(e)
                    }
                    var f = {};
                    return {
                        on: a,
                        emit: e,
                        create: u,
                        listeners: c,
                        _events: f
                    }
                }

                function r() {
                    return {}
                }
                var o = "nr@context",
                    i = n("gos");
                e.exports = t()
            }, {
                gos: "7eSDFh"
            }],
            ee: [function(n, e) {
                e.exports = n("QJf3ax")
            }, {}],
            3: [function(n, e) {
                function t(n) {
                    return function() {
                        r(n, [(new Date).getTime()].concat(i(arguments)))
                    }
                }
                var r = n("handle"),
                    o = n(1),
                    i = n(2);
                "undefined" == typeof window.newrelic && (newrelic = window.NREUM);
                var a = ["setPageViewName", "trackUserAction", "finished", "traceEvent", "inlineHit", "noticeError"];
                o(a, function(n, e) {
                    window.NREUM[e] = t("api-" + e)
                }), e.exports = window.NREUM
            }, {
                1: 12,
                2: 13,
                handle: "D5DuLP"
            }],
            gos: [function(n, e) {
                e.exports = n("7eSDFh")
            }, {}],
            "7eSDFh": [function(n, e) {
                function t(n, e, t) {
                    if (r.call(n, e)) return n[e];
                    var o = t();
                    if (Object.defineProperty && Object.keys) try {
                        return Object.defineProperty(n, e, {
                            value: o,
                            writable: !0,
                            enumerable: !1
                        }), o
                    } catch (i) {}
                    return n[e] = o, o
                }
                var r = Object.prototype.hasOwnProperty;
                e.exports = t
            }, {}],
            D5DuLP: [function(n, e) {
                function t(n, e, t) {
                    return r.listeners(n).length ? r.emit(n, e, t) : (o[n] || (o[n] = []), void o[n].push(e))
                }
                var r = n("ee").create(),
                    o = {};
                e.exports = t, t.ee = r, r.q = o
            }, {
                ee: "QJf3ax"
            }],
            handle: [function(n, e) {
                e.exports = n("D5DuLP")
            }, {}],
            XL7HBI: [function(n, e) {
                function t(n) {
                    var e = typeof n;
                    return !n || "object" !== e && "function" !== e ? -1 : n === window ? 0 : i(n, o, function() {
                        return r++
                    })
                }
                var r = 1,
                    o = "nr@id",
                    i = n("gos");
                e.exports = t
            }, {
                gos: "7eSDFh"
            }],
            id: [function(n, e) {
                e.exports = n("XL7HBI")
            }, {}],
            G9z0Bl: [function(n, e) {
                function t() {
                    var n = v.info = NREUM.info;
                    if (n && n.licenseKey && n.applicationID && f && f.body) {
                        c(d, function(e, t) {
                            e in n || (n[e] = t)
                        }), v.proto = "https" === l.split(":")[0] || n.sslForHttp ? "https://" : "http://", a("mark", ["onload", i()]);
                        var e = f.createElement("script");
                        e.src = v.proto + n.agent, f.body.appendChild(e)
                    }
                }

                function r() {
                    "complete" === f.readyState && o()
                }

                function o() {
                    a("mark", ["domContent", i()])
                }

                function i() {
                    return (new Date).getTime()
                }
                var a = n("handle"),
                    c = n(1),
                    u = (n(2), window),
                    f = u.document,
                    s = "addEventListener",
                    p = "attachEvent",
                    l = ("" + location).split("?")[0],
                    d = {
                        beacon: "bam.nr-data.net",
                        errorBeacon: "bam.nr-data.net",
                        agent: "js-agent.newrelic.com/nr-536.min.js"
                    },
                    v = e.exports = {
                        offset: i(),
                        origin: l,
                        features: {}
                    };
                f[s] ? (f[s]("DOMContentLoaded", o, !1), u[s]("load", t, !1)) : (f[p]("onreadystatechange", r), u[p]("onload", t)), a("mark", ["firstbyte", i()])
            }, {
                1: 12,
                2: 3,
                handle: "D5DuLP"
            }],
            loader: [function(n, e) {
                e.exports = n("G9z0Bl")
            }, {}],
            12: [function(n, e) {
                function t(n, e) {
                    var t = [],
                        o = "",
                        i = 0;
                    for (o in n) r.call(n, o) && (t[i] = e(o, n[o]), i += 1);
                    return t
                }
                var r = Object.prototype.hasOwnProperty;
                e.exports = t
            }, {}],
            13: [function(n, e) {
                function t(n, e, t) {
                    e || (e = 0), "undefined" == typeof t && (t = n ? n.length : 0);
                    for (var r = -1, o = t - e || 0, i = Array(0 > o ? 0 : o); ++r < o;) i[r] = n[e + r];
                    return i
                }
                e.exports = t
            }, {}]
        }, {}, ["G9z0Bl"]);
    </script>
    <title><?= safeHtml(safeTitle(@$meta['title'] ? $meta['title'] : @$meta['og:title'])) ?></title>
    <?php if (@is_array($meta)) foreach ($meta as $key => $val): ?>
    <meta name="<?= safeAttr($key) ?>" content="<?= safeAttr(safeTitle($val)) ?>"/>
    <?php endforeach; ?>
    <link rel="stylesheet" href="<?= $assets['/css/recipe4living.css'] ?>"/>
    <meta name="author" content="Recipe4Living, Recipe4Living.com"/>
    <meta name="verify-v1" content="MdhXUubKMGRn6vL5WSVMEXeKt6D4mMrULy9MG+6+Zf8="/>
    <link rel="stylesheet" href="http://www.recipe4living.com/frontend/recipe4living/css/site.css,nav.css,index.css,articles.css,landing.css,recipes.css,account.css,static.css,stickywin.css?v=a80cb" type="text/css" media="screen"/>
    <link type="text/css" href="http://www.recipe4living.com/frontend/recipe4living/css/print.css?v=4" media="print" rel="stylesheet">
    <!--[if IE 6]><link href="http://www.recipe4living.com/frontend/recipe4living/css/ie6.css?v=4" rel="stylesheet" type="text/css"/><![endif]-->
    <!--[if IE 7]><link href="http://www.recipe4living.com/frontend/recipe4living/css/ie7.css?v=4" rel="stylesheet" type="text/css"/><![endif]-->
    <link rel="shortcut icon" href="http://www.recipe4living.com/frontend/recipe4living/images/favicon.ico" type="image/vnd.microsoft.icon"/>
    <link rel="icon" href="http://www.recipe4living.com/frontend/recipe4living/images/favicon.ico" type="image/vnd.microsoft.icon"/>
    <script>
        /* Define global static variables. */
        DEBUG = false;
        SITEURL = '';
        SITESECUREURL = 'https://www.recipe4living.com';
        SITEINSECUREURL = 'http://www.recipe4living.com';
        ASSETURL = '/assets';
        COREASSETURL = '/frontend/base';
        SITEASSETURL = '/frontend/recipe4living';
    </script>
    <script src="http://www.recipe4living.com/frontend/base/js/mootoolsCore.js,mootoolsMore.js,StickyWin.js,Interface.js,Nav.js,HistoryManager.js,Forms.js,BrowseArea.js,Autocompleter.js,Milkbox.js,Wizard.js,sifr.js,Slideshow.js,Articles.js?ver=6wnp"></script>
    <script src="http://www.recipe4living.com/frontend/base/js/jquery.min.js,jquery.fancybox-1.3.4.pack.js,jquery.cookie.js"></script>
    <script>
        var R4LSignUpDhtml = jQuery.noConflict();
        var R4LDhtml = jQuery.noConflict();
    </script>
    <script>
        window.addEvent('domready', function() {
            /* Init history manager */
            HistoryManager.initialize();
            /* Get reference to body content */
            var bodyContent = $(document.body);
            /* Top nav */
            var topNav = new TopNav($('nav-top'));
            /* Standard forms */
            bodyContent.getElements('div.standardform, fieldset.standardform').each(function(formcontainer) {
                var standardForm = new StandardForm(formcontainer);
            });
            /* Article items */
            /*              var articleItems = new ArticleItems($('panel-center'), null, {
                                quickView: {
                                    use: false
                                },
                                scrollTo: true
                            }); */ // Don't execute this in order to cater for abysmal code.
            /* Popups */
            var infoPopups = new InfoPopups(bodyContent.getElements('a.info-popup'));
            var printPopups = new AssetPopups(bodyContent.getElements('a.print-popup'), {
                windowKey: 'recipe4living_print_popup'
            });
            /* Page scroll */
            var pageScroll = new PageScroll(bodyContent.getElements('a.scroll'), {
                wheelStops: false
            });
            /* Start history manager */
            HistoryManager.start();
            /* Input over text */
            $$('input.simpletext, textarea.simpletext').each(function(input) {
                new InputText(input);
            });
        });
        window.addEvent('load', function() {});
    </script>
    <meta name="msvalidate.01" content="E03168D9BB4076DC3C37E21B03C7EE91"/>
    <script src="https://apis.google.com/js/plusone.js"></script>
</head>

<body>
    <!-- INFOLINKS_OFF -->
    <!-- start of matchflowmedia.com tags -->
    <!--Old PIXEL 1-->
    <script>
        /* Version: 0.3 */
        try {
            var _mag = _mag || {};
            _mag.kw = 'recipes';
            _mag.shortName = 'matchflow31-foodanddrink';
            _mag.startTime = (new Date()).getTime();
            (function(d, t) {
                var mag = d.createElement('script');
                mag.type = 'text/javascript';
                mag.async = true;
                mag.src = t;
                var head = d.getElementsByTagName('head')[0] || d.documentElement;
                head.insertBefore(mag, head.firstChild);
            })(document, '//d3ezl4ajpp2zy8.cloudfront.net/matchflow31-foodanddrink_tag.js');
        } catch (e) {}
    </script>
    <SCRIPT SRC="http://loadus.exelator.com/load/?p=341&g=031&c=2353742"></SCRIPT>
    <iframe name="__bkframe" height="0" width="0" frameborder="0" src="javascript:void(0)"></iframe>
    <script src="http://www.bkrtx.com/js/bk-static.js"></script>
    <script>
        // INSERT DATA HERE IN THE FORM:
        bk_addPageCtx("<<Category>>", "<<recipes>>");
        bk_addPageCtx("<<Category>>", "<<cooking>>");
        bk_addPageCtx("<<Category>>", "<<food>>");
        bk_addPageCtx("<<Category>>", "<<women>>");
        bk_doJSTag(6117, 4);
    </script>
    <script src="http://tags.crwdcntrl.net/c/1850/cc.js?ns=_cc1850" id="LOTCC_1850"></script>
    <script>
        _cc1850.add("int", "recipes");
        _cc1850.add("int", "cooking");
        _cc1850.add("int", "food");
        _cc1850.add("int", "women");
        _cc1850.bcp();
    </script>
    <!-- end of matchflowmedia.com tags -->
    <!--Sticky Menu-->
    <script src="http://www.recipe4living.com/frontend/base/js/stickymenu.js"></script>
    <div id="nav-header">
        <div class="site-wrapper" id="top-ad">
            <div class="screenonly">
                <div class="ad" data-id="728x90_ATF"></div>
            </div>
        </div>
        <div class="site-wrapper">
            <div id="logo">
                <a href="/"><img style="width:387px;margin-left: -5px;" class="screenonly" alt="Recipe4Living" src="http://www.recipe4living.com/frontend/recipe4living/images/site/R4L-Homepage-Logo.png"/></a>
                <a href="/"><img class="printonly" alt="Recipe4Living" src="http://www.recipe4living.com/frontend/recipe4living/images/site/R4L-Homepage-Logo.png"/></a>
            </div>
            <div class="tagline">
                <h4>Easy recipes and a helping of fun from home cooks like you.</h4></div>
            <div class="standardform screenonly">
                <div id="nav-links" class="screenonly text-content fr">
                    <ul>
                        <li> <a href="http://www.recipe4living.com/facebook/login/" id="sign_in"><span>Login</span></a> / <a href="http://www.recipe4living.com/register/" id="join_now"><span>Register</span></a> </li>
                    </ul>
                </div>
                <div class="formholder">
                    <form id="nav-top-form-search" action="/search" method="get" class="search fullsubmit">
                        <div>
                            <div class="categories">
                                <label class="radio">
                                    <input class="controllerradio" name="controller" type="radio" value="recipes"/> Recipes</label>
                                <label class="radio">
                                    <input class="controllerradio" name="controller" type="radio" value="articles" checked="checked"/> Articles</label>
                                <div class="clear"></div>
                            </div>
                            <input class="textinput simpletext fl" type="text" title="Enter search keywords..." autocomplete="off" name="searchterm" value=""/>
                            <button class="button-lg fl" type="submit" title="Find"><span>Search</span></button>
                        </div>
                    </form>
                </div>
            </div>
            <div class="clear"></div>
        </div>
    </div>
    <div id="nav-top" class="screenonly">
        <div class="site-wrapper">
            <ul id="nav-top-list">
                <li class="parent home">
                    <div class="nav-item"> <a href="/"><span>Home</span></a> </div>
                </li>
                <li class="parent recipes drops">
                    <div class="nav-item"> <a href="http://www.recipe4living.com/recipes"><span>Recipes</span></a> </div>
                    <div class="nav-popup">
                        <div class="nav-popup-bg">
                            <div class="dd-products">
                                <ul>
                                    <li><a href="http://www.recipe4living.com/appetizers">Appetizers</a></li>
                                    <li><a href="http://www.recipe4living.com/crockpot">Crockpot</a></li>
                                    <li><a href="http://www.recipe4living.com/casseroles">Casseroles</a></li>
                                    <li><a href="http://www.recipe4living.com/desserts">Desserts</a></li>
                                    <li><a href="http://www.recipe4living.com/main_courses">Main Courses</a></li>
                                </ul>
                                <div class="clear"></div>
                            </div>
                        </div>
                    </div>
                </li>
                <li class="parent">
                    <div class="nav-item"> <a href="http://www.recipe4living.com/hints_tips/recipe_collections"><span>Recipe Collections</span></a> </div>
                </li>
                <li class="parent">
                    <div class="nav-item"> <a href="http://www.recipe4living.com/articles"><span>Articles</span></a> </div>
                </li>
                <li class="parent">
                    <div class="nav-item"> <a href="http://www.recipe4living.com/hints_tips/product_reviews"><span>Product Reviews</span></a> </div>
                </li>
                <li class="parent">
                    <div class="nav-item"> <a href="http://videos.recipe4living.com/"><span>Videos</span></a> </div>
                </li>
                <li class="parent" style="padding:0px;">
                    <div class="nav-icon-item"> <span>Follow Us:</span>
                        <a href="http://goo.gl/8XKWk" target="_blank"><img src="http://www.recipe4living.com/frontend/recipe4living/images/site/R4l-facebook.png"/></a>
                        <a href="http://goo.gl/QWWuy" target="_blank"><img src="http://www.recipe4living.com/frontend/recipe4living/images/site/R4l-twitter.png"/></a>
                        <a href="http://goo.gl/LBcYo" target="_blank"><img src="http://www.recipe4living.com/frontend/recipe4living/images/site/R4l-pinterest.png"/></a>
                        <a href="http://bit.ly/ZxqJ3w" target="_blank"><img src="http://www.recipe4living.com/frontend/recipe4living/images/site/R4l-googleplus.png"/></a>
                    </div>
                </li>
            </ul>
        </div>
    </div>
    <div id="content-wrapper">
        <div class="site-wrapper">
            <!-- INFOLINKS_ON -->
            <div id="main-content" class="recipes">
                <div id="column-container" style="padding-left:0px;width:645px;">
                    <div id="panel-center" class="column" style="width:645px;">
                        <div id="jds" class="<?= $site_slug ?>">
                        <a class="banner" href="/"><span>Enter to win prizes daily</span></a>
                            <?php
                                foreach ($view as $v) {
                                    $this->load->view($v, compact('data'));
                                }
                            ?>
                        </div>
                    </div>
                    <div id="panel-right" class="column">
                        <div class="ad" data-id="300x250_ATF"></div>
                        <div class="our_best">
                            <h2>Our Best Recipe Collections</h2>
                            <div class="content">
                                <a href="http://www.recipe4living.com/recipes/baked_chicken_and_mozzarella_salad.htm"><img alt="Baked Chicken and Mozzarella Salad" src="http://www.recipe4living.com/assets/itemimages/280/125/3/default_2f4e92c8484363c0a922b75aaebc62db_dreamstimesmall_47614245.jpg" width="280" height="125"/></a>
                                <div class="recipe_desc">
                                    <h2><a href="http://www.recipe4living.com/recipes/baked_chicken_and_mozzarella_salad.htm">Baked Chicken and Mozzarella Salad</a></h2>
                                </div>
                            </div>
                        </div>
                        <div class="clear"></div>
                        <div class="ad">
                            <div class="ad" data-id="300x250_BTF"></div>
                            <div style="font-family:Arial color:#000000; font-size:18px; font-weight:bold !important; margin-bottom:5px;">Around The Web</div>
                            <div class="ad" data-id="zergnet-widget-29019"></div>
                            <div class="screenonly">
                                <br>
                                <!-- begin ZEDO 3 for channel:  R4L_LP_HouseAds_300x250 , publisher: AmpereMedia , Ad Dimension: Medium Rectangle - 300 x 250 -->
                                <script>
                                    netseer_tag_id = "2358";
                                    netseer_ad_width = "300";
                                    netseer_ad_height = "100";
                                    netseer_task = "ad";
                                </script>
                                <script src="http://contextlinks.netseer.com/dsatserving2/scripts/netseerads.js"></script>
                            </div>
                        </div>
                    </div>
                    <div class="clear"></div>
                </div>
            </div>
            <!-- INFOLINKS_OFF -->
            <div class="clear"></div>
            <div class="ad" data-id="728x90_BTF" id="footer-ad"></div>
        </div>
    </div>
    <div id="footer" class="site-wrapper screenonly">
        <div style="text-align: center; margin: 0px; padding-bottom: 0px;background-color: background:#e2ded5;"> <img src="http://www.recipe4living.com/frontend/recipe4living/images/site/FamilyOfSites.png" border="0"/> </div>
        <div style="width: 980px;" id="mainFooterDiv">
            <div class="rssdiv" id="ffrss">
                <ol class="rssfeed">
                    <div id="li_item"><a target="_blank" title="Watermelon Fruit Bowl" href="http://www.fitandfabliving.com/recipes/recipe-tips/10691-watermelon-fruit-bowl">Watermelon Fruit Bowl</a> </div>
                    <div id="li_item"><a target="_blank" title="Cantaloupe Ball Bowl" href="http://www.fitandfabliving.com/recipes/recipe-tips/10673-cantaloupe-ball-bowl">Cantaloupe Ball Bowl</a> </div>
                    <div id="li_item"><a target="_blank" title="Cantaloupe Fruit Salad " href="http://www.fitandfabliving.com/recipes/recipe-tips/10675-cantaloupe-fruit-salad">Cantaloupe Fruit Salad </a> </div>
                    </li>
            </div>
            <div class="rssdiv" id="wimrss">
                <ol class="rssfeed">
                    <div id="li_item"> <a target="_blank" title="Spring Fashion For Little Girls" href="http://www.workitmom.com/articles/detail/201343/spring-fashion-for-little-girls">
            Spring Fashion For Little...            </a> </div>
                    <div id="li_item"> <a target="_blank" title="Sweet Strawberry Reduction" href="http://www.workitmom.com/articles/detail/201339/sweet-strawberry-reduction">
            Sweet Strawberry Reduction            </a> </div>
                    <div id="li_item"> <a target="_blank" title="Nutella Smoothie" href="http://www.workitmom.com/articles/detail/201337/nutella-smoothie">
            Nutella Smoothie            </a> </div>
                </ol>
            </div>
            <div class="rssdiv" id="rwmrss">
                <ol class="rssfeed">
                    <div id="li_item"><a target="_blank" title="Beautiful Appetizer Recipes" href="http://www.savvyfork.com/component/yoorecipe/category/11-appetizers.html">Beautiful Appetizer Recipes</a></div>
                    <div id="li_item"><a target="_blank" title="Sumptuous Main Dish Recipes" href="http://www.savvyfork.com/component/yoorecipe/category/13-main-dishes.html">Sumptuous Main Dish Recipes</a></div>
                    <div id="li_item"><a target="_blank" title="Gorgeous Dessert Recipes" href="http://www.savvyfork.com/component/yoorecipe/category/15-desserts.html">Gorgeous Dessert Recipes</a></div>
                </ol>
            </div>
            <div class="rssdiv" id="cotrss">
                <ol class="rssfeed">
                    <div id="li_item"> <a target="_blank" title="Unholy Cannoli!" href="http://www.chewonthatblog.com/2014/10/31/unholy-cannoli/">
            Unholy Cannoli!            </a> </div>
                    <div id="li_item"> <a target="_blank" title="Join us Tonight at 7pm CT for our ?#Chocoholic? National Chocolate Day Twitter Party" href="http://www.chewonthatblog.com/2014/10/28/join-us-tonight-at-7pm-ct-for-our-chocoholic-national-chocolat-day-twitter-party/">
            Join us Tonight at 7pm CT for...            </a> </div>
                    <div id="li_item"> <a target="_blank" title="Join us Tonight at 7pm CT for our ?#MyMug? National Coffee Day Twitter Party" href="http://www.chewonthatblog.com/2014/09/29/join-us-tonight-at-7pm-ct-for-our-mymug-national-coffee-day-twitter-party/">
            Join us Tonight at 7pm CT for...            </a> </div>
                </ol>
            </div>
            <div style="clear: left;"></div>
            <div class="mainFooterDiv">
                <a target="_blank" id="box-link-ff" href="http://www.fitandfabliving.com/"></a>
                <a target="_blank" id="box-link-wim" href="http://www.workitmom.com/"></a>
                <a target="_blank" id="box-link-rwm" href="http://www.savvyfork.com/"></a>
                <a target="_blank" id="box-link-cot" href="http://www.chewonthatblog.com/"></a>
            </div>
            <div style="clear: left;"></div>
            <div id="topLinks" style="text-align: center;padding-top:150px;"> <span style="padding-left: 0px;">
        <a href="http://www.recipe4living.com/about">About Us</a>&nbsp;|&nbsp;
        <a href="http://www.recipe4living.com/contact/">Contact Us</a>&nbsp;|&nbsp;
        <a href="http://www.recipe4living.com/press">Press Room</a>&nbsp;|&nbsp;
        <a href="http://www.recipe4living.com/sitemap">Site Map</a>&nbsp;|&nbsp;
        <a href="http://www.recipe4living.com/index/links">Advertising</a>&nbsp;|&nbsp;
        <a href="http://www.recipe4living.com/privacy">Privacy Policy</a>&nbsp;|&nbsp;
        <a href="http://www.recipe4living.com/terms">Terms of Use</a>&nbsp;|&nbsp;
        <a href="http://www.recipe4living.com/index/unsub">Unsubscribe</a>&nbsp;|&nbsp;
        <a href="http://www.recipe4living.com/index/subctr">Manage My Newsletters</a>
    </span>
                <p class="text-content">
                    <br>&copy; 2015 <a href="http://www.junemedia.com/" target="_blank">June Media Inc</a> All rights reserved</p>
            </div>
        </div>
    </div>
    <div class="clear"></div>
    <!-- FM Tracking Pixel -->
    <script type='text/javascript' src='http://static.fmpub.net/site/recipe4livingco'></script>
    <!-- FM Tracking Pixel -->
    <script>
        var infolinks_pid = 1863387;
        var infolinks_wsid = 0;
    </script>
    <script src="http://resources.infolinks.com/js/infolinks_main.js"></script>
    <script src="http://edge.quantserve.com/quant.js"></script>
    <script>
        _qacct = "p-ed7ji9FtIlPSo";
        quantserve();
    </script>
    <!-- start of matchflowmedia.com tags -->
    <iframe src="//CLIENTS.BLUECAVA.COM/data/?p=54e940be-0063-4a66-be74-f2b37a831761&sid=31&cat=recipes" width="0" height="0" frameBorder="0" scrolling="no"></iframe>
    <script>
        try {
            (function() {
                var s = document.createElement("script");
                s.defer = true;
                s.src = "//tag.crsspxl.com/s1.js?d=1530";
                var s0 = document.getElementsByTagName('script')[0];
                s0.parentNode.insertBefore(s, s0);
            })();
        } catch (e) {}
    </script>
    <script async src="http://i.simpli.fi/dpx.js?cid=6272&m=1"></script>
    <!-- end of matchflowmedia.com tags -->
    <!-- LiveRamp -->
    <!--<iframe name="_rlcdn" width=0 height=0 frameborder=0 src="http://rc.rlcdn.com/381139.html"></iframe>-->
    <!-- LiveRamp -->
    <script>
        try {
            var w = top,
                guid = 'dRKpBGeA8r5kFwacwqm_6l';
            if (w.document.location.protocol == 'http:') {
                w.Tynt = w.Tynt || [];
                w.Tynt.push(guid);
                var s = w.document.createElement('script');
                s.async = "async";
                s.type = "text/javascript";
                s.src = 'http://tcr.tynt.com/ti.js';
                var h = w.document.getElementsByTagName('script')[0];
                h.parentNode.insertBefore(s, h);
            }
        } catch (e) {}
    </script>
    <script>
        window.NREUM || (NREUM = {});
        NREUM.info = {
            "beacon": "bam.nr-data.net",
            "licenseKey": "5080428538",
            "applicationID": "5794714",
            "transactionName": "Y1EHYxNXV0UAUEZdV1obMEUIGVBYBVZKGkhcRA==",
            "queueTime": 0,
            "applicationTime": 110,
            "atts": "TxYEFVtNREs=",
            "errorBeacon": "bam.nr-data.net",
            "agent": "js-agent.newrelic.com\/nr-536.min.js"
        }
    </script>


    <?php
        if (@$solvemedia) {
            $this->load->view('partials/captcha');
        }
    ?>
    <script async src="//ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
    <!-- Create the `jds` pre-object/function which allows for jds() calls before jds.js is loaded -->
    <script>(function(w,m){w[m]=w[m]&&!w[m].nodeName?w[m]:function(){(w[m].q=w[m].q||[]).push(arguments)}})(window,'jds')<?php

        $js_script_arr = array();

        /* SolveMedia */
        if (@$solvemedia) {
            $js_script_arr[] = $solvemedia;
        }

        /* GTM */
        if (@$site_gtm) {
            $js_script_arr[] = 'jds("gtm","' . $site_gtm . '")';
        }

        if ($js_script_arr) {
            echo ';' . implode(';', $js_script_arr);
        }
    ?></script>
    <script async src="<?= $assets['/js/recipe4living.js'] ?>"></script>
</body>

</html>
