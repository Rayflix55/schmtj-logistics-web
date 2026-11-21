# SCHMTJ Logistics Services

Option B is the navy-and-gold A380 tarmac presentation: a centred "Your Trusted Partner" headline, floating glass navigation, animated routes from Abuja, and a translucent statistics band. The React, TypeScript, Vite, and Tailwind frontend retains the working animal-to-quote flow and editable WhatsApp/email enquiry drafts.

## Run locally

- `npm install`
- `npm run dev`
- `npm run build` creates the production site in `dist/`.
- `npm run preview` serves the production build locally.

Deploy the **entire `dist/` directory**. JavaScript and CSS are inlined into the built HTML; photographs, the favicon, and the font remain separate static files.

## Customer journeys

- Selecting any of the five animals takes the visitor to its preselected travel estimate.
- Estimates respond to destination, weight, crate provision, and documentation support. Confirmation opens WhatsApp with all choices and the indicative USD range.
- Each service has an accessible detail dialog and a direct path to a preselected enquiry form.
- Contact form submissions create a WhatsApp or email draft containing the visitor's details. The visitor must review the message and press Send in that app. The website never claims to have delivered a lead.
- Shipment tracking recognises explicit sample references, including `SCH-482913`. Unknown references are not presented as real shipments.
- Three operation showcases each have three independently selectable, keyboard-accessible scenes. The service fan, FAQs, map disclosure, mobile navigation, privacy information, and travel update requests are interactive.

## Content and design

- `src/App.tsx`: page composition, selected animal, enquiry handoffs, and dialogs.
- `src/components/`: customer-facing sections, calculator, contact form, and tracking.
- `src/data/logistics.ts`: services, destinations, illustrative rates, and contact details.
- `src/index.css`: shared controls, layout, and reduced-motion preferences.
- `src/styles/option-b.css`: the restored centred A380 composition, service fan, starfield promise, showcase frames, and gold statistics band.
- `public/images/`: optimised, locally served WebP photographs and responsive hero assets.
- `public/fonts/`: locally hosted Manrope and JetBrains Mono with their SIL Open Font Licenses.

The hero uses Peter Xie's original [Emirates Airbus A380 tarmac photograph](https://www.pexels.com/photo/emirates-airbus-a380-parked-at-airport-38291810/) (Pexels 38291810), with local desktop and mobile WebP assets. It depicts an airport apron and does not assert that the photograph was taken in Abuja. Gallery and operations stock photography is sourced from Pexels (photo IDs 15289416, 25047759, 8432736, 35057569, 22632189, 27490332, 33824595, 30030222, 32010723, and 33824585).

## Client preview

`SCHMTJ-Client-Demo.zip` contains the deployable Option B build under `SCHMTJ-Demo/`. Extract the ZIP and upload that folder to a static web host. No server credentials or source files are included in the client package.

## Verification

- `npx tsc --noEmit`
- `npx playwright install --with-deps chromium` (first browser setup)
- `npx playwright test`

The browser suite verifies brand tokens, gallery selection, pricing, invalid weight handling, contact validation, complete message handoffs, keyboard tabs, example tracking, and responsive layouts. Outbound WhatsApp requests are intercepted in the test: no messages are sent.

## Demo scope

No backend, database, payment, or carrier tracking feed is used. Prices, statistics, and shipment examples are illustrative. Business claims, permit eligibility, and final prices must be confirmed with SCHMTJ before a production launch. The Google Maps embed loads only after the visitor requests the airport map.# schmtj-logistics-web
