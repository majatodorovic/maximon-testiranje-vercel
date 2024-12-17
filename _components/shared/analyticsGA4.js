"use client";

import Script from "next/script";

export const AnalyticsGA4 = () => {

    if(process.env.GA4_CODE) {
        return (
            <>
                <Script
                    id="google-analytics"
                    src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GA4_CODE}`}
                    strategy="beforeInteractive"
                />
                <Script
                    id="google-analytics-init"
                    strategy="beforeInteractive"
                >
                    {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.GA4_CODE}');
          `}
                </Script>
            </>
        );
    }
};
