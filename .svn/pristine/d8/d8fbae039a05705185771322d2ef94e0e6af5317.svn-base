import {Inject, Injectable, PLATFORM_ID} from "@angular/core";
import {Logger} from "../logger/logger";
import {isPlatformBrowser, isPlatformWorkerApp, isPlatformWorkerUi, PlatformLocation} from "@angular/common";
import {DOCUMENT} from "@angular/platform-browser";
import "../../../lib/modernizr.js";
import {APP_CONFIG, IAppConfig} from "../../../environments/environment";
import {UtilityService} from "./utility.service";

@Injectable()
export class BrowserSupportService {
    isPlatformBrowser: boolean;
    document: any;
    baseUrl: string;

    constructor(private logger: Logger, @Inject(PLATFORM_ID) private platformId: any,
                private platformLocation: PlatformLocation, @Inject(APP_CONFIG) private config: IAppConfig,
                @Inject(DOCUMENT) private _document: any, private utilityService: UtilityService) {
        this.isPlatformBrowser = isPlatformBrowser(this.platformId) || isPlatformWorkerApp(this.platformId) || isPlatformWorkerUi(this.platformId)
        this.baseUrl = this.platformLocation['location'].origin;
    }

    checkBasicBrowserSupport() {
        if (this.isPlatformBrowser && !this.isBot()) {
            let featureList = ["flexbox", "canvas", "flexwrap", "mediaqueries", "svg", "promises", "intl"];
            let missingFeaturesList = featureList.filter(feature => !Modernizr[feature])
            if (missingFeaturesList.length > 0) {
                let url = this.config.browserSupportMissingURL + this.prepareUrlSuffix(featureList);
                this.utilityService.redirectionByWindow(url);
            } else {
                this.logger.debug("This browser supports all basic features required");
            }
        } else {
            this.logger.debug("Not a platform browser");
        }
    }

    isBot() {
        if (this.isPlatformBrowser) {
            var botPattern = "(googlebot\/|Googlebot-Mobile|Googlebot-Image|Google favicon|Mediapartners-Google|bingbot|slurp|java|wget|curl|Commons-HttpClient|Python-urllib|libwww|httpunit|nutch|phpcrawl|msnbot|jyxobot|FAST-WebCrawler|FAST Enterprise Crawler|biglotron|teoma|convera|seekbot|gigablast|exabot|ngbot|ia_archiver|GingerCrawler|webmon |httrack|webcrawler|grub.org|UsineNouvelleCrawler|antibot|netresearchserver|speedy|fluffy|bibnum.bnf|findlink|msrbot|panscient|yacybot|AISearchBot|IOI|ips-agent|tagoobot|MJ12bot|dotbot|woriobot|yanga|buzzbot|mlbot|yandexbot|purebot|Linguee Bot|Voyager|CyberPatrol|voilabot|baiduspider|citeseerxbot|spbot|twengabot|postrank|turnitinbot|scribdbot|page2rss|sitebot|linkdex|Adidxbot|blekkobot|ezooms|dotbot|Mail.RU_Bot|discobot|heritrix|findthatfile|europarchive.org|NerdByNature.Bot|sistrix crawler|ahrefsbot|Aboundex|domaincrawler|wbsearchbot|summify|ccbot|edisterbot|seznambot|ec2linkfinder|gslfbot|aihitbot|intelium_bot|facebookexternalhit|yeti|RetrevoPageAnalyzer|lb-spider|sogou|lssbot|careerbot|wotbox|wocbot|ichiro|DuckDuckBot|lssrocketcrawler|drupact|webcompanycrawler|acoonbot|openindexspider|gnam gnam spider|web-archive-net.com.bot|backlinkcrawler|coccoc|integromedb|content crawler spider|toplistbot|seokicks-robot|it2media-domain-crawler|ip-web-crawler.com|siteexplorer.info|elisabot|proximic|changedetection|blexbot|arabot|WeSEE:Search|niki-bot|CrystalSemanticsBot|rogerbot|360Spider|psbot|InterfaxScanBot|Lipperhey SEO Service|CC Metadata Scaper|g00g1e.net|GrapeshotCrawler|urlappendbot|brainobot|fr-crawler|binlar|SimpleCrawler|Livelapbot|Twitterbot|cXensebot|smtbot|bnf.fr_bot|A6-Indexer|ADmantX|Facebot|Twitterbot|OrangeBot|memorybot|AdvBot|MegaIndex|SemanticScholarBot|ltx71|nerdybot|xovibot|BUbiNG|Qwantify|archive.org_bot|Applebot|TweetmemeBot|crawler4j|findxbot|SemrushBot|yoozBot|lipperhey|y!j-asr|Domain Re-Animator Bot|AddThis)";
            var re = new RegExp(botPattern, 'i');
            var userAgent = navigator.userAgent;
            this.logger.debug("userAgent: " + userAgent);
            if (re.test(userAgent)) {
                return true;
            } else {
                return false;
            }
        } else {
            this.logger.debug("Not a platform browser");
            return false;
        }
    }

    prepareUrlSuffix(featureList: string[]): string {
        let urlParams = "?";
        featureList.forEach(featureString => {
            if (!Modernizr[featureString]) {
                urlParams += this.getMissingSupportUrl(urlParams, featureString, Modernizr[featureString])
            }
        })
        return urlParams
    }

    getMissingSupportUrl(urlParams: string, paramName: string, isFeatureSupported: boolean): string {
        if (urlParams.length > 1) {
            urlParams += ("&" + paramName + "=" + isFeatureSupported)
        } else {
            urlParams += ( paramName + "=" + isFeatureSupported)
        }
        return urlParams
    }

    isFeatureSupported(featureName: string): boolean {
        if (this.isPlatformBrowser) {
            return Modernizr[featureName]
        } else {
            return false
        }
    }

    isLocalStorageSupported(): boolean {
        return this.isFeatureSupported("localstorage")
    }


}