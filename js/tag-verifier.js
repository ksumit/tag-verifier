/**
 * This code is copyright 24/7, Inc. and is fully protected under copyright law.
 * This code may only be used pursuant to a valid license by 24/7, Inc.
 */

var PROVIDER_PATTERNS = {
    "247-px-tag" : /\S+\.247ilabs\.com/,
    "google-analytics" : /\.google\-analytics\.com\/ga\.js/,
    "ensighten" : /nexus\.ensighten\.com/,
    "tagman" : /res\.levexis\.com/,
    "ubertags" : /app\.ubertags\.com/,
    "liveperson" : /\.liveperson\.net/,
    "brighttag" : /s\.btstatic\.com/,
    "rightnow" : /RightNow(.*)\.js$/,
    "instantservice-invite" : /InstantInvite/,
    "instantservice-tracking" : /ts\.istrack\.com/,
    "monetate" : /\.monetate\.net/,
    "omniture" : /s\_code\.js/,
    "bluekai" : /bluekai(.*).js/,
    "inq-chat" : /inqChat(.*).js/,
    "marin-softwares" : /tracker\.marinsm\.com/,
    "webtrends" : /webtrends(.*)\.js/,
    "egain" : /egain(.*)\.js/,
    "google-analytics-urchin" : /urchin\.js$/,
    "opentag" : /opentag\-(.*)\.js$/,
    "gomez" : /gomez\.js$/,
    "tealeaf" : /TeaLeaf/,
    "estara" : /\.estara\.com/,
    "rich-relevance" : /\.richrelevance\.com/,
    "coremetrics" : /\.coremetrics\.com/
};

function extractDomain(path) {
    if (path.indexOf("http") != 0) {
        return location.hostname;
    } else {
        var indexOfColon = path.indexOf(":");
        var indexOfSlash = path.indexOf("/", indexOfColon + 3);
        return path.substring(indexOfColon + 3, indexOfSlash);
    }
}

function extractScriptDomains() {
    var scripts = document.getElementsByTagName("script");
    var activeScriptDomains = {};
    for ( var i = 0; i < scripts.length; i++) {
        var scrpt = scripts[i];
        var scriptDomain = extractDomain(scrpt.src);
        activeScriptDomains[scriptDomain] = true;
    }
    return activeScriptDomains;
}

function extractScripts() {
    var scripts = document.getElementsByTagName("script");
    var sourcePaths = [];
    for ( var i = 0; i < scripts.length; i++) {
        sourcePaths.push(scripts[i].src);
    }
    return sourcePaths;
}

var allScriptPaths = extractScripts();

var tagsFound = 0;
var tagsFoundMap = {};
for ( var i = 0; i < allScriptPaths.length; i++) {
    var scriptPath = allScriptPaths[i];
    if (scriptPath != "") {
        for ( var provider in PROVIDER_PATTERNS) {
            var matched = scriptPath.match(PROVIDER_PATTERNS[provider]);
            if (matched != null && matched.length > 0 && tagsFoundMap[provider] != true) {
                tagsFoundMap[provider] = true;
                tagsFound++;
            }
        }
    }
}

var alertMessage = "No providers found!";
if (tagsFound > 0) {
    alertMessage = "Following tag(s) were found:\n";
    for ( var provider in tagsFoundMap) {
        alertMessage += "\n" + provider;
    }
}
alert(alertMessage);