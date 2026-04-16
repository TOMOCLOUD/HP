'use client';

import { useDict } from '@/lib/useDict';

export default function Footer() {
  const { dict, locale } = useDict();
  const f = dict?.footer;
  const nav = dict?.common?.nav;

  return (
    <footer className="bg-gray-900 text-white py-14 md:py-16" role="contentinfo">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
        <div className="space-y-3 md:space-y-4">
          <p className="text-2xl md:text-3xl font-semibold">{f?.company}</p>
          <div>
            <p className="text-base md:text-lg font-semibold">{f?.zip}</p>
            <p className="text-base md:text-lg font-semibold">{f?.address}</p>
          </div>
          <div><p className="text-base md:text-lg font-semibold">{f?.tel}</p></div>
          <div><p className="text-base md:text-lg font-semibold">{f?.email}</p></div>
        </div>

        <div className="grid grid-cols-[max-content_max-content] gap-3 md:gap-5 md:justify-self-end md:mr-6">
          <div>
            <h4 className="text-xl font-semibold mb-3">{f?.pages}</h4>
            <ul className="space-y-2 text-slate-100">
              <li><a href={`/${locale}/`} className="hover:underline">{nav?.home}</a></li>
              <li><a href={`/${locale}/services`} className="hover:underline">{nav?.product}</a></li>
              <li><a href={`/${locale}/news`} className="hover:underline">{nav?.news}</a></li>
              <li><a href={`/${locale}/achievements`} className="hover:underline">{nav?.achievement}</a></li>
              <li><a href={`/${locale}/recruit`} className="hover:underline">{nav?.recruit}</a></li>
              <li><a href={`/${locale}/contact`} className="hover:underline">{nav?.contact}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-3">{f?.links}</h4>
            <ul className="space-y-2 text-slate-100">
              <li>
                <a
                  href="https://tomocloud.xsrv.jp/takei-lab/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {f?.externalLab}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
