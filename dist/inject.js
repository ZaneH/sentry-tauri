import * as Sentry from '@sentry/browser';
import { defaultOptions } from './';
import { Store } from "@tauri-apps/plugin-store";
Store.load(".settings.dat").then((store => {
    store.get("is-sentry-on").then((isSentryOn) => {
        if (!Boolean(isSentryOn)) {
            return;
        }
        Sentry.init({
            ...defaultOptions,
            // We replace this with true or false before injecting this code into the browser
            debug: __DEBUG__,
        });
        window.Sentry = Sentry;
    });
}));
