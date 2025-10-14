/**
 * The CMS seat selection content - used as a fallback when the CMS server might
 * not be available, and to define the corresponding type.
 *
 * Last updated: 2025-08-19
 *
 * Copied from prod:
 *   - https://www.jetblue.com/resp-magnoliapublic/.rest/jetblue/v4/en/page/home/seat-selection?depth=2
 *
 * For different environments, see:
 *   - dev: https://www-dev2.jetblue.com/resp-magnoliapublic/.rest/jetblue/v4/en/page/home/seat-selection?depth=2
 *   - stg: https://www-stg2.jetblue.com/resp-magnoliapublic/.rest/jetblue/v4/en/page/home/seat-selection?depth=2
 */
export const CB_SEAT_SELECTION_CMS_FALLBACK_CONTENT = {
  area: [
    {
      component: [
        {
          data: {
            mintSeatTiltRightImage:
              'https://www.jetblue.com/resp-magnoliapublic/dam/booking-images/seat-selection/seat-type-detail-images/Mint_Suite_3NS.png',
            moreSpaceSeatImage:
              'https://www.jetblue.com/resp-magnoliapublic/dam/booking-images/seat-selection/seat-type-detail-images/more-space.png',
          },
          name: 'commonIcons',
        },
      ],
    },
    {
      component: [
        {
          data: {
            altText:
              'ALT: if we want to pair Core with EMS with tabs, which is equivalent to Mint Suites and Mint Studio…',
            backButton: 'Back',
            checkoutStepCard: 'Your fare includes free advance seat selection.',
            corePreferredText: 'Preferred',
            coreSeat: 'Choose <#> Core seats',
            coreSeatsText: 'Core Seats',
            coreSeatText: 'Core Seat',
            coreText: 'Core',
            dialogBtnText: 'OK',
            evenMore: 'EvenMore®',
            evenMoreSeatMsg:
              'You have selected an Even More® seat for an additional cost of $%s.',
            evenMoreSpaceText: 'Even More Space',
            extraLegroom: 'Extra legroom',
            extraLegroomSeatMsg:
              'You have selected an Extra Legroom seat for an additional cost of $%s.',
            fromText: 'from',
            headerFlightText: 'Flight',
            hideLegend: 'Hide seat legend',
            jetblueExperience:
              '<p><strong>The JetBlue experience</strong><br />\nMake time fly with free high-speed wi-fi*, live TV* &amp; movies at every seat, and more.&nbsp;</p>\n\n<p>&nbsp;</p>\n\n<p><strong>The JetBlue experience</strong><br />\nexpanded:</p>\n\n<p>&nbsp;</p>\n\n<p><strong>The JetBlue experience</strong></p>\n\n<p>Make time fly with free high-speed wi-fi*, live TV* &amp; movies at every seat, and more.</p>\n\n<p>Includes a planeload of perks and award-winning service&mdash;no matter where you sit. But you&rsquo;ve got options.</p>\n\n<p><strong>Extra legroom</strong></p>\n\n<p>Stretch out in an exit-row or over-wing location.</p>\n\n<p><strong>Preferred</strong></p>\n\n<p>Get on your way faster with a seat in the first few rows of Core.</p>\n\n<p><strong>Core</strong></p>\n\n<p>Free Fly-Fi&reg; and seatback entertainment, plus snacks + drinks.</p>\n\n<p>* Availability and coverage&nbsp;area may vary by aircraft.</p>\n\n<p>Even More&reg;<br />\nexpanded:</p>\n\n<p><strong>EvenMore&reg;</strong></p>\n\n<p>Plus-up the core JetBlue experience with premium perks at the airport &amp; on board. Restrictions &amp; exclusions apply.&nbsp;</p>\n\n<p>Includes extra legroom, a prime location toward the front, early boarding, dedicated bin space, free inflight alcoholic drinks*, a premium snack offering*, and priority security (30+ airports).</p>\n',
            jetBlueExperience: 'The JetBlue experience',
            learnMore: 'Learn more',
            mintStudio:
              '<p>-Fully enclosed suite with direct aisle access and a sliding door for privacy<br />\n-Fully lie-flat seat featuring Tuft &amp; Needle Adaptive&reg; foam cushions<br />\n-Restaurant-inspired seasonal small plates menu<br />\n-Expertly crafted cocktails and curated wine<br />\n-Fast, free high-speed Fly-Fi&reg; &amp; tons of entertainment options&nbsp;<br />\n-First &amp; second checked bag free<br />\n-Expedited check-in, fast lane to security &amp; early boarding<br />\n-Front-row Mint Studio&reg; with the largest bed &amp; TV on a US airline, a mirrored vanity, and an extra seat &amp; table to work, lounge &amp; entertain</p>\n',
            mintStudioText: 'Mint Studio',
            mintSuiteText: 'Mint Suite',
            mintSuiteVsMintStudio:
              '<p>Choose your Mint experience.</p>\n\n<p>Mint Suite<br />\nFully enclosed suite with direct aisle access and a sliding door for privacy<br />\nFully lie-flat seat featuring Tuft &amp; Needle Adaptive&reg; foam cushions<br />\nRestaurant-inspired seasonal small plates menu<br />\nExpertly crafted cocktails and curated wine<br />\nState-of-the-art connectivity &amp; entertainment&nbsp;<br />\nFirst &amp; second checked bag free<br />\nExpedited check-in, fast lane to security &amp; early boarding</p>\n\n<p>Mint Studio<br />\nEnjoy all the perks &amp; comfort of Mint, plus&hellip;<br />\nA fully enclosed front-row suite with direct aisle access and a sliding door for privacy<br />\nMore space and an extra seat &amp; table to work, lounge &amp; entertain<br />\nThe largest bed &amp; TV on a US airline<br />\nA mirrored vanity and additional storage</p>\n',
            mintText: 'Mint',
            nextButtonText: 'Next: Return Flight',
            nextText: 'Next:',
            noThanks: 'No, thanks',
            noThankText: 'No Thanks',
            orText: 'or',
            pointsText: 'pts',
            popularAddOnText: 'Popular add-on',
            preferredText: 'Preferred',
            priceUpgrade: 'Total $<###>/for <#> passenger(s)',
            seatInformationPanelSupport:
              '<p><strong>EvenMore&reg;</strong></p>\n\n<p><strong>Includes premium perks at the</strong><strong> airport and on board</strong><strong>.</strong></p>\n\n<p>&bull;&nbsp;Extra legroom</p>\n\n<p>&bull;&nbsp;A prime location toward the front of the plane</p>\n\n<p>&bull;&nbsp;Early boarding</p>\n\n<p>&bull; Dedicated bin space</p>\n\n<p>&bull;&nbsp;Free inflight alcoholic drinks*</p>\n\n<p>&bull; Free premium snack offering*</p>\n\n<p>&bull; Priority security at 30+ airports</p>\n\n<p><strong>Plus,</strong><strong> all the perks&mdash;and award-winning service&mdash;</strong><strong>of the core JetBlue experience.</strong></p>\n\n<p>&bull; Free high-speed wi-fi for everyone**</p>\n\n<p>&bull; Free live TV** and movies at every seat</p>\n\n<p>&bull; Free brand-name snacks + drinks</p>\n\n<p>* Does not apply to flights under 250 miles or with no inflight service. Max 3 free alcoholic drinks per flight, 21+. Can&#39;t be combined with other free drink perks or offers. (Transatlantic flights already include free beer, wine &amp; liquor.)&nbsp;</p>\n\n<p>** Availability and coverage area may vary by aircraft.&nbsp;</p>\n',
            seatInformationSupport:
              '<p>The tried and true JetBlue experience features the most legroom in coach, a host of freebies and award-winning service.</p>\n',
            seatNotAvailableLongDescription:
              'You can select your seat on our partner’s  website after booking.',
            seatNotAvailableShortDescription:
              'Partner seat selection is unavailable',
            seatRecommendationCardFlag:
              '2 options: Popular Add-On OR Get Even More',
            seatRecommendationCardMintFlag: 'How Suite It Is.',
            seatRecommendationCardSupport:
              'Plus-up the core JetBlue experience with premium perks at the airport & on board. Restrictions & exclusions apply. ',
            seatRecommendationFlag: 'NO FLAG',
            seatRecommendationSupport:
              'The JetBlue experience features the most legroom in coach, a host of freebies and award-winning service.',
            selectExtrasButton: 'Next: Select extras',
            selectSeats: 'Select seats',
            selectSeatText: 'Select %s seats',
            stepCard:
              'Heads up! You’re booking a Blue Basic fare, which means you can select seats in advance for a fee—or choose from remaining seats starting 24 hours before departure for free. For free advance seat selection, please return to the search results and book a Blue, Blue Plus or Blue Extra fare instead.',
            stepCardMint:
              'Mint Whether you choose side-by-side seating or your own suite with a sliding door for privacy, you’ll enjoy all the perks of our award-winning premium travel experience, including the longest fully lie-flat seat on a domestic premium flight.',
            stepCardMINT:
              'Mint Enjoy all the perks of our award-winning premium travel experience, including fully enclosed suites with privacy doors, direct aisle access, and lie-flat seats with Tuft & Needle Adaptive® foam cushions. For %s more, you can select our new front-row Mint Studio®, with the largest bed & TV on a US airline, and an extra seat & space to work, lounge & entertain.',
            transatlanticAddOnCoreDescription:
              'The transatlantic edition of the tried and true JetBlue experience still features the most legroom in coach, a host of freebies and award-winning service.',
            travelerText: 'travelers',
            upgradeChoose: 'Choose <#> Even More Space seats',
            upgradeText: 'Upgrade',
            upgradeToMint: 'Mint fares start at %s.',
            useTrueBluePoints: 'Use TrueBlue points',
            viewLegend: 'View seat legend',
          },
          name: 'selectSeat',
        },
        {
          data: {
            fixedArmRest: 'Fixed armrest',
            inArmVideo: 'Touchscreen in armrest',
            limitedRecline: 'Limited recline',
            narrow: 'Narrow seat',
            noRecline: 'No recline',
            notWindow: 'Does not have a window',
            noUnderSeatStorage: 'No under-seat Storage',
            noWindow: 'No window',
            preferredSeat: 'This is a preferred seat closer to the front',
            traySeatInArm: 'Tray in arm rest',
          },
          name: 'seatPopoverAttributes',
        },
      ],
    },
    {
      component: [
        {
          data: {
            numberOfChildren: '11',
          },
          name: 'checkSum',
        },
      ],
    },
  ],
  children: [
    {
      area: [
        {
          component: [
            {
              data: {
                airbusDetailsText: 'details',
                airbusExitText: 'Exit',
                mintExperience: 'Choose your Mint Experience',
                mintSeatBenefitList: [
                  {
                    benefit:
                      "Fully lie-flat seat with Tuft & Needle's T&N Adaptive® Foam cushions",
                    image:
                      'https://www.jetblue.com/resp-magnoliapublic/dam/booking-images/seat-selection/seat-type-detail-images/fully-enclosed-suite.png',
                  },
                  {
                    benefit:
                      'Choice of side-by-side seating or a suite with direct aisle access',
                    image:
                      'https://www.jetblue.com/resp-magnoliapublic/dam/booking-images/seat-selection/seat-type-detail-images/side-by-side.png',
                  },
                  {
                    benefit: 'Restaurant-inspired seasonal small plates menu',
                    image:
                      'https://www.jetblue.com/resp-magnoliapublic/dam/booking-images/seat-selection/seat-type-detail-images/MintFoodFlat.png',
                  },
                  {
                    benefit: 'Expertly crafted cocktails and curated wine',
                    image:
                      'https://www.jetblue.com/resp-magnoliapublic/dam/booking-images/seat-selection/seat-type-detail-images/mint-Cocktail-wine.jpg',
                  },
                  {
                    benefit:
                      'Fast, free high-speed Fly-Fi® & tons of entertainment options',
                    image:
                      'https://www.jetblue.com/resp-magnoliapublic/dam/booking-images/seat-selection/seat-type-detail-images/free-fly-fi.png',
                  },
                ],
                mintSeatImages: [
                  {
                    description:
                      'Each suite features a fully lie-flat seat with direct aisle access.',
                    image:
                      'https://www.jetblue.com/resp-magnoliapublic/dam/booking-images/seat-selection/seat-type-detail-images/fully-enclosed-suite.png',
                  },
                  {
                    description:
                      'Side-by-side seating is ideal for couples or others traveling together.',
                    image:
                      'https://www.jetblue.com/resp-magnoliapublic/dam/booking-images/seat-selection/seat-type-detail-images/side-by-side.png',
                  },
                ],
                mintSeatRecommendationCard: [
                  {
                    code: 'MINT_STUDIO',
                    description:
                      'Our most spacious front-row suites feature a guest seat & table to work, lounge & entertain.',
                    image:
                      'https://www.jetblue.com/resp-magnoliapublic/dam/booking-images/seat-selection/seat-type-detail-images/2021_Jetblue_A321NEOLDMint_653-1.png',
                    title: 'Mint Studio',
                  },
                  {
                    code: 'MINT_SUITE',
                    description:
                      "Features a fully lie-flat seat with Tuft & Needle's T&N Adaptive® Foam cushions.",
                    image:
                      'https://www.jetblue.com/resp-magnoliapublic/dam/booking-images/seat-selection/seat-type-detail-images/2021_Jetblue_A321NEOLDMint_515-1.png',
                    title: 'Mint Suite',
                  },
                ],
                mintStudioBenefitList: [
                  {
                    benefit:
                      'A spacious front-row suite with direct aisle access and extra amenities',
                    image:
                      'https://www.jetblue.com/resp-magnoliapublic/dam/booking-images/seat-selection/seat-type-detail-images/Mint_Studio_3NS.png',
                  },
                  {
                    benefit:
                      'More space and a guest seat & table to work, lounge & entertain',
                    image:
                      'https://www.jetblue.com/resp-magnoliapublic/dam/booking-images/seat-selection/seat-type-detail-images/2021_Jetblue_A321NEOLDMint_650-1.png',
                  },
                  {
                    benefit: 'The largest TV on a US airline',
                    image:
                      'https://www.jetblue.com/resp-magnoliapublic/dam/booking-images/seat-selection/seat-type-detail-images/2021_Jetblue_A321NEOLDMint_635-1.png',
                  },
                  {
                    benefit: 'A mirrored vanity and additional storage',
                    image:
                      'https://www.jetblue.com/resp-magnoliapublic/dam/booking-images/seat-selection/seat-type-detail-images/2021_Jetblue_A321NEOLDMint_709-1.png',
                  },
                ],
                mintSuiteBenefitList: [
                  {
                    benefit: 'A suite with direct aisle access',
                    image:
                      'https://www.jetblue.com/resp-magnoliapublic/dam/booking-images/seat-selection/seat-type-detail-images/2021_Jetblue_A321NEOLDMint_427-1.png',
                  },
                  {
                    benefit:
                      'Fully lie-flat seat featuring Tuft & Needle T&N Adaptive® foam cushions',
                    image:
                      'https://www.jetblue.com/resp-magnoliapublic/dam/booking-images/seat-selection/seat-type-detail-images/2021_Jetblue_A321NEOLDMint_472-1.png',
                  },
                  {
                    benefit: 'Restaurant-inspired seasonal small plates menu',
                    image:
                      'https://www.jetblue.com/resp-magnoliapublic/dam/booking-images/seat-selection/seat-type-detail-images/2021_Jetblue_A321NEOLDMint_447-1.png',
                  },
                  {
                    benefit: 'Expertly crafted cocktails and curated wine',
                    image:
                      'https://www.jetblue.com/resp-magnoliapublic/dam/booking-images/seat-selection/seat-type-detail-images/2021_Jetblue_A321NEOLDMint_418-1.png',
                  },
                  {
                    benefit: 'State-of-the-art connectivity & entertainment',
                    image:
                      'https://www.jetblue.com/resp-magnoliapublic/dam/booking-images/seat-selection/seat-type-detail-images/2021_Jetblue_A321NEOLDMint_725-1.png',
                  },
                ],
                mintTripNotice:
                  'Arrive in Mint condition with our award-winning take on premium travel.',
                mintTripNotice3NS:
                  'Our award-winning take on premium travel. All suites. All with direct aisle access.',
              },
              name: '00',
            },
          ],
        },
      ],
      data: {
        hideInNav: 'false',
        title: 'Mint experience',
      },
      name: 'mint',
    },
    {
      area: [
        {
          component: [
            {
              data: {
                benefitFootNotes: [
                  {
                    footNote:
                      'Blue Basic fares combined with Even More Space will be eligible for Group A boarding (and a free carry-on bag).',
                  },
                ],
                coreBenefitDetail:
                  'Our core JetBlue experience includes the most legroom in coach, free high-speed wi-fi, seatback entertainment and more.',
                coreBenefits: [
                  {
                    benefit: 'The most legroom in coach',
                  },
                  {
                    benefit: 'Free high-speed wi-fi',
                  },
                  {
                    benefit: 'Free live TV<sup>®</sup> & movies at every seat',
                  },
                  {
                    benefit: 'Free brand-name snacks + drinks',
                  },
                  {
                    benefit: 'Award-winning service and comfort',
                  },
                ],
                coreDrawerImg:
                  'https://www.jetblue.com/resp-magnoliapublic/dam/booking-images/seat-selection/seat-type-detail-images/core-drawer.png',
                coreDrawerImgAlt: 'Core drawer image ',
                emsBenefitDetail:
                  'Get up to 7” more legroom, early boarding and, well, even more.',
                emsBenefits: [
                  {
                    benefit: 'Up to 7” more legroom',
                  },
                  {
                    benefit: 'Group A boarding',
                  },
                  {
                    benefit: 'Early access to overhead bins',
                  },
                  {
                    benefit: 'Expedited security lanes (where available)',
                  },
                ],
                emsDrawerImg:
                  'https://www.jetblue.com/resp-magnoliapublic/dam/booking-images/seat-selection/seat-type-detail-images/ems-drawer.png',
                emsDrawerImgAlt: 'EMS drawer Image',
                evenMoreSpace: [
                  {
                    emsPoints: 'Limited Recline',
                  },
                  {
                    emsPoints: 'No underseat storage',
                  },
                  {
                    emsPoints: 'Slightly slimmer seat',
                  },
                  {
                    emsPoints: 'This seat has limited recline',
                  },
                ],
                locationText: 'Location.Location.Location.',
                mixedCabinBody:
                  'This leg of your trip does not offer Mint service',
                mixedCabinTitle: 'Just a heads up:',
                moreText: 'more',
                preferredBenefitDetail:
                  'Purchase a preferred Core seat up front to get on your way faster.',
                selectSeatText: 'Select Seat',
                useTrueBluePointText: 'Use TrueBlue Points',
              },
              name: '0',
            },
          ],
        },
      ],
      data: {
        hideInNav: 'false',
        title: 'Even More Space',
      },
      name: 'even-more-space',
    },
    {
      area: [
        {
          component: [
            {
              data: {
                edgeCases: [
                  {
                    code: 'UPGRADE_TO_EMS_OR_MINT',
                    description:
                      '<p>There aren&rsquo;t any Core seats to choose from right now, but you&rsquo;ve got options. You can check back to see if any open up or wait to get your seat assignments at the airport. You can also select an Even More&reg; Space or Mint seat now for an additional fee.</p>\n',
                    title: 'Heads up! ',
                  },
                  {
                    code: 'MULTISEGMENT_FLIGHT',
                    description:
                      '<p>You can select seats for your JetBlue flight, but seats for any flights operated by a partner airline will be assigned separately on the day of travel.</p>\n',
                    title: 'Heads up! ',
                  },
                  {
                    code: 'ONLY_ONE_LEG',
                    description:
                      '<p>Since this flight is operated by one of our partners, we can&rsquo;t guarantee a seat assignment now, but they&rsquo;ll confirm on the day of travel.</p>\n',
                    title: 'Heads up! ',
                  },
                  {
                    code: 'CAN_CHOOSE_SEATS_ONE_LEG_ONLY',
                    description:
                      '<p>Since your trip is operated by one of our partners, you can choose a seat now but you&rsquo;ll need to confirm it on the day of travel.</p>\n',
                    title: 'Heads up! ',
                  },
                  {
                    code: 'CANT_GUARANTEE_SEAT_-MORE_THAN_ONE_LEG',
                  },
                  {
                    code: 'NO_ADVANCE_SEAT_AVAILABLE',
                    description:
                      '<p>There are only paid seats available on this flight leg. You can select a paid seat or skip seat selection for this portion of your itinerary.</p>\n',
                  },
                  {
                    code: 'EXTRA_SEAT_PERSON',
                    description:
                      '<p>Since you&rsquo;ve requested an extra seat, please choose the one you want and we&rsquo;ll automatically also assign the one right next to it, if it&rsquo;s available.</p>\n',
                    title: 'Heads up! ',
                  },
                  {
                    code: 'UNACCOMPANIED_MINOR',
                    description:
                      '<p>When buying a seat for an unaccompanied minor, you can only choose from the seats in the back of the plane (that way our crewmembers can help keep an eye on them).</p>\n',
                    title: 'Heads up! ',
                  },
                  {
                    code: 'MINORS_IN_EXIT_ROW',
                    description:
                      '<p>For the safety of all passengers, exit rows are reserved for travelers over 15 years of age</p>\n',
                  },
                  {
                    code: 'NO_REMAINING_SEATS',
                    description:
                      '<p>Since there currently aren&rsquo;t any seats together for adults and children, we&rsquo;ll assign your seats on the day of travel.</p>\n',
                  },
                  {
                    code: 'MORE_THAN_ONE_LAP_INFANT',
                    description:
                      '<p>For safety, groups travelling with more than one lap infant can only select one seat per row in the same aisle.</p>\n',
                  },
                  {
                    code: 'MORE_THAN_ONE_LAP_INFANT',
                    description:
                      '<p>Since you have more than one lap infant, we can assign your seats on the day of travel free of charge, or you can choose an Even More&reg; Space or Mint seat now for an additional fee. OR The currently available Core seats will not accommodate more than one lap infant, but you&rsquo;ve got options. We can assign your seats on the day of travel free of charge, or you can choose an Even More&reg; Space or Mint seat now for an additional fee.</p>\n',
                  },
                  {
                    code: 'UMNR_MUSICAL_INSTRUMENT',
                    description:
                      '<p>When buying a seat for an unaccompanied minor, you can only choose from seats in the back of the plane so our crew members can sit with them. Musical instruments should be placed in a window seat next to one of the travelers.</p>\n',
                    title: 'Heads up!',
                  },
                  {
                    code: 'EXTRA_SEATS_INSTRUMENT',
                    description:
                      '<p>Please note that if adjacent seats are not available for extra seat(s), you may skip seat selection and they will be assigned at the airport. Musical instruments should be placed in a window seat next to one of the travelers</p>\n',
                    title: 'Heads up!',
                  },
                  {
                    code: 'MUSICAL_INSTRUMENT',
                    description:
                      '<p>Musical instruments should be placed in a window seat next to one of the travelers.</p>\n',
                    title: 'Heads up!',
                  },
                  {
                    code: 'UMNR_EXTRA_SEAT',
                    description:
                      '<p>When buying a seat for an unaccompanied minor, you can only choose from seats in the back of the plane so our crew members can assist them when needed. Since you&rsquo;ve requested an extra seat, choose whichever you want and we&rsquo;ll automatically assign the one right next to it.</p>\n',
                    title: 'Heads up!',
                  },
                ],
              },
              name: '0',
            },
          ],
        },
      ],
      data: {
        hideInNav: 'false',
        title: 'Heads Up ',
      },
      name: 'heads-up-page',
    },
    {
      area: [
        {
          component: [
            {
              data: {
                description:
                  'There is no adjacent seats available for the seat you have selected. Please modify your selection.',
                title: 'Extra Seat Selection',
              },
              name: '0',
            },
          ],
        },
      ],
      data: {
        hideInNav: 'false',
        title: 'Extra Seat Selection',
      },
      name: 'popup-extra-seat-selection',
    },
    {
      area: [
        {
          component: [
            {
              data: {
                benefitFootNotes: [
                  {
                    footNote:
                      '* Availability and coverage area may vary by aircraft. ',
                  },
                ],
                benefits: [
                  {
                    benefit: 'Free high-speed wi-fi for everyone*',
                  },
                  {
                    benefit: 'Free live TV* and movies at every seat ',
                  },
                  {
                    benefit: 'Free brand-name snacks + drinks',
                  },
                ],
                boldMsg:
                  'You’ve selected an Extra legroom seat for an additional cost of $%s.',
                boldMsgTbUser:
                  'You have selected an Extra legroom seat for an additional cost of %s TrueBlue points or $%s.',
                confirmMsg:
                  'By purchasing this seat, you confirm the traveler meets the requirements. If not, click "Cancel" to select a different seat.',
                corePreferredSeatMsg:
                  'You have selected a Core (preferred) seat for an additional cost of $%s',
                corePreferredSeatMsgTbUser:
                  'You have selected a Core (preferred) seat for an additional cost of %s1 TrueBlue points or $%s2.',
                coreSeatMsg:
                  'You have selected a Core seat for an additional cost of $%s',
                coreSeatMsgTbUser:
                  'You have selected a Core seat for an additional cost of %s1 TrueBlue points or $%s2.',
                evenMoreSeatMsg:
                  'You have selected an Even More® seat for an additional cost of $%s.',
                extraLegroomSeatMsg:
                  'You have selected an Extra Legroom seat for an additional cost of $%s.',
                lessTBPointsMessage:
                  "You don't have enough points to redeem for this seat.",
                locationOnPlane: 'Due to its location on the plane,this seat:',
                mainMsg:
                  'The exit-row location gives you extra room to stretch out, plus all the perks—and award-winning service—of the core JetBlue experience, including:',
                reqFailureMsg:
                  'Failure to meet these requirements will result in removal from the seat and reseating at the airport or onboard',
                requirementMsg:
                  'Customers sitting in the exit row MUST meet the following requirements',
                requirements: [
                  {
                    requirements:
                      'Able to read, understand, or give instructions in English',
                  },
                  {
                    requirements:
                      'Willing and able to assist in case of an emergency',
                  },
                  {
                    requirements:
                      'Be free from any condition(physical or mental) that may prevent you from assisting in case of an emergency',
                  },
                  {
                    requirements:
                      'Have the strength, mobility, or balance required to open the exit, assist the crew, and exit the aircraft speedily',
                  },
                  {
                    requirements: 'Be at least 15 years old or older',
                  },
                  {
                    requirements:
                      'Have no other responsibilities that would prevent you from helping, such as traveling with a pet or infant',
                  },
                  {
                    requirements:
                      'Are not traveling with a walking assistive device(canes, wheelchairs, walkers, or crutches)',
                  },
                  {
                    requirements:
                      'Are not traveling with pets or service animals.',
                  },
                ],
                seatCharacteristics: [
                  {
                    code: 'NARROW',
                    description: 'Is slightly narrower than others',
                  },
                  {
                    code: 'FIXED_ARMREST',
                    description: 'Has a fixed arm rest',
                  },
                  {
                    code: 'TRAY_IN_ARM',
                    description:
                      'Has a tray table that is located in the arm rest',
                  },
                  {
                    code: 'NO_STOWAGE',
                    description:
                      'Does not have under-seat storage, so carry-on items must be stored in overhead bins during taxi takeoff and landing',
                  },
                  {
                    code: 'IN_ARM_VIDEO',
                    description:
                      'Has a TV that pivots from the arm rest, which must be stowed for taxi, takeoff,  and landing',
                  },
                  {
                    code: 'NO_RECLINE',
                    description: 'No recline',
                  },
                  {
                    code: 'LIMITED_RECLINE',
                    description: 'Limited recline',
                  },
                  {
                    code: 'NOT_WINDOW',
                    description: 'No window',
                  },
                  {
                    code: 'WINDOW_SEAT_NO_WINDOW',
                    description: 'No window',
                  },
                  {
                    code: 'EXIT_ROW_SEAT',
                    description: 'Is located in an EXIT ROW',
                  },
                  {
                    code: 'PREFERRED_SEAT',
                    description: 'This is a preferred seat closer to the front',
                  },
                ],
                tbPointsCbx: 'Use %s TrueBlue Points',
                title: 'Important seat info',
              },
              name: '0',
            },
          ],
        },
      ],
      data: {
        hideInNav: 'false',
        title: 'Exit Row Dialog',
      },
      name: 'exit-row-dialog',
    },
    {
      area: [
        {
          component: [
            {
              data: {
                boldMsg: 'Musical instruments in a purchased seat',
                instrumentTitle: 'Traveling with musical instruments',
                mainMsg:
                  'Musical instruments of a size (such as upright basses, cellos and some guitars) that prevent the instrument from being handled as normal carry-on bag will be accepted onboard subject to the following:',
                musicalInstrumentErrorDialogContent:
                  'Oops! There seem to be some errors below. Please correct them. Musical Instruments should be placed in a window seat next to one of the travelers',
                musicalInstrumentErrorDialogTitle: 'Musical Instrument',
                note: 'Note: A boarding pass cannot be issued until the instrument is weighed at the ticket counter.',
                requirements: [
                  {
                    requirements:
                      'An extra seat has been purchased for the instrument',
                  },
                  {
                    requirements:
                      'The instrument must be placed in a window seat',
                  },
                  {
                    requirements:
                      'The extra seat for the instrument cannot be purchased in an exit row',
                  },
                  {
                    requirements:
                      'Its bulk shape or size will not obstruct seat belts or no smoking signs when secured in the seat',
                  },
                  {
                    requirements:
                      'It has no sharp edges and is shaped so that it may be secured with a seat belt',
                  },
                  {
                    requirements:
                      'It does not weigh more than 165 pounds (75 kg) and can easily handled by the customer',
                  },
                  {
                    requirements:
                      'The instrument must be weighed at the ticket counter prior to proceeding to the gate in order to board the flight',
                  },
                ],
              },
              name: '0',
            },
          ],
        },
      ],
      data: {
        hideInNav: 'false',
        title: 'Instrument Dialog',
      },
      name: 'instrument-dialog',
    },
    {
      area: [
        {
          component: [
            {
              data: {
                description:
                  "Since we didnt notice any activity for a while, we ended your session. If you're still there and want to keep looking, return to shopping cart.",
                positiveBtn: 'Return to cart',
                title: 'Your session has expired',
              },
              name: '0',
            },
          ],
        },
      ],
      data: {
        hideInNav: 'false',
        title: 'Session Expiry ',
      },
      name: 'popup-session-expiry',
    },
    {
      area: [
        {
          component: [
            {
              data: {
                description:
                  'Only one lap infant is allowed per group of seats due to the number of available oxygen masks. Please modify your selection.',
                title: 'Lap infant seat selection',
              },
              name: '0',
            },
          ],
        },
      ],
      data: {
        hideInNav: 'false',
        title: 'Popup lap infant message',
      },
      name: 'popup-lap-infant-message',
    },
    {
      area: [
        {
          component: [
            {
              data: {
                description:
                  'If you would like to book a Mint seat, please go back to the Flights page and select a Mint fare.',
                negativeBtn: 'Back to seat selection',
                positiveBtn: 'Back to results',
                title: 'Mint Upgrade',
              },
              name: '0',
            },
          ],
        },
      ],
      data: {
        hideInNav: 'false',
        title: 'Mint Upgrade Content',
      },
      name: 'popup-mint-upgrade',
    },
    {
      area: [
        {
          component: [
            {
              data: {
                addOnEMSDescription:
                  'Plus early access to the overhead bins and expedited security lanes.',
                addOnEMSPlusDescription:
                  'All the perks of Even More Space, plus an open seat next to you for extra space between travelers.',
                benefitFootNotes: [
                  {
                    footNote:
                      'Blue Basic fares combined with Even More Space will be eligible for Group A boarding (and a free carry-on bag).',
                  },
                ],
                emsImage:
                  'https://www.jetblue.com/resp-magnoliapublic/dam/booking-images/seat-selection/emsImage.png.png',
                emsPlusHeader: 'Get even more',
                emsPlusImage:
                  'https://www.jetblue.com/resp-magnoliapublic/dam/booking-images/seat-selection/emsplusImage.png.png',
                emsPlusMsg:
                  'You have selected an Even More® Space plus seat for an additional cost of $%s.',
                emsPlusSubHeader:
                  'For just a little more, you can get a lot more.',
                emsPlusTbUserMsg:
                  'You have selected an Even More® Space plus seat for an additional cost of %s TrueBlue points or $%s.',
                emsPlusTitle: 'Even More Space Plus',
                emsPlusTitleHeader: 'Even More® Space Plus',
                learnMoreBenefits: [
                  {
                    benefit: 'An empty seat next to you',
                  },
                  {
                    benefit: 'Up to 7” more legroom',
                  },
                  {
                    benefit: 'Group A boarding',
                  },
                  {
                    benefit: 'Early access to overhead bins',
                  },
                  {
                    benefit: 'Expedited security lanes (where available)',
                  },
                ],
                seatBenefits: [
                  {
                    benefit: 'Blocked middle seat next to you',
                  },
                  {
                    benefit: 'Extra legroom (up to 7” more!)',
                  },
                  {
                    benefit:
                      'Early boarding (with early access to the overhead bins)',
                  },
                  {
                    benefit:
                      ' Even More® Space – the first lane to the TSA checkpoint at your departure airport (select cities)',
                  },
                ],
              },
              name: '0',
            },
          ],
        },
      ],
      data: {
        description: 'Even More Space Plus seats',
        hideInNav: 'false',
        title: 'Even More Space Plus',
      },
      name: 'even-more-space-plus',
    },
    {
      area: [
        {
          component: [
            {
              data: {
                benefitFootNotes: [
                  {
                    footNote:
                      "* Does not apply to flights under 250 miles or with no inflight service. Max 3 free alcoholic drinks per flight, 21+. Can't be combined with other free drink perks or offers. (Transatlantic flights already include free beer, wine & liquor.) ",
                  },
                  {
                    footNote:
                      '** Availability and coverage area may vary by aircraft.',
                  },
                ],
                coreBenefitDetail:
                  'Free Fly-Fi® and seatback entertainment, plus snacks + drinks. ',
                coreBenefitFootNotes: [
                  {
                    footNote:
                      '* Availability and coverage area may vary by aircraft.',
                  },
                ],
                coreBenefits: [
                  {
                    benefit: 'Free high-speed wi-fi for everyone* ',
                  },
                  {
                    benefit: 'Free live TV* and movies at every seat',
                  },
                  {
                    benefit: 'Free brand-name snacks + drinks',
                  },
                ],
                coreDrawerImg:
                  'https://www.jetblue.com/resp-magnoliapublic/dam/booking-images/seat-selection/seat-type-detail-images/core-drawer.png',
                coreDrawerImgAlt: 'Core drawer image ',
                coreLearnMoreBenefitDetail:
                  'The core JetBlue experience includes a plandload of perk & award-winning service.',
                emBDetails: [
                  {
                    emDetails: 'Free high-speed wi-fi for everyone**',
                  },
                  {
                    emDetails: 'Free live TV** and movies at every seat',
                  },
                  {
                    emDetails: 'Free brand-name snacks + drinks',
                  },
                ],
                emBenefitDetail:
                  'Includes premium perks at the airport and on board.',
                emBenefits: [
                  {
                    benefit: 'Extra legroom',
                  },
                  {
                    benefit: 'A prime location toward the front of the plane',
                  },
                  {
                    benefit: 'Early boarding ',
                  },
                  {
                    benefit: 'Dedicated bin space',
                  },
                  {
                    benefit: 'Free inflight alcoholic drinks*',
                  },
                  {
                    benefit: 'Free premium snack offering*',
                  },
                  {
                    benefit: 'Priority security at 30+ airports',
                  },
                ],
                emDetail:
                  'Plus, all the perks—and award-winning service—of the core JetBlue experience.',
                emDetailLevel1:
                  'Includes extra legroom, a prime location toward the front, early boarding, dedicated bin space, free inflight alcoholic drinks, a premium snack offering, and priority security (30+ airports). ',
                emDrawerImgAlt: 'EM drawer Image',
                evenMore: [
                  {
                    emPoints: 'Limited Recline',
                  },
                  {
                    emPoints: 'No underseat storage',
                  },
                ],
                extraLegroomBenefitDetail:
                  'Stretch out in an exit-row or over-wing location. On E190s, extra legroom seats are also located in the first row.',
                image_emDrawerImg:
                  'https://www.jetblue.com/resp-magnoliapublic/dam/booking-images/seat-selection/seat-type-detail-images/ems-drawer.png',
                jetBlueExperDetail:
                  'Make time fly with free high-speed wi-fi*, live TV* & movies at every seat, and more. ',
                jetBlueExperDetailLevel1:
                  'Includes a planeload of perks and award-winning service—no matter where you sit. But you’ve got options. ',
                mixedCabinBody:
                  'This leg of your trip does not offer Mint service',
                mixedCabinTitle: 'Just a heads up:',
                moreText: 'more',
                preferredDetail:
                  'Get on your way faster with a seat in the first few rows of Core. ',
                selectSeatText: 'Select Seat',
                useTrueBluePointText: 'Use TrueBlue Points',
              },
              name: '0',
            },
          ],
        },
      ],
      data: {
        hideInNav: 'false',
        keywords: 'Even More',
        navigationTitle: 'Even More',
        title: 'Even More',
      },
      name: 'even-more',
    },
  ],
  data: {
    hideInNav: 'false',
    title: 'Seat selection',
  },
  name: 'seat-selection',
  pageMetadata: [
    {
      authorPageCount: 11,
      description: 'This is an automated checksum result',
      jcrPageCount: 11,
      pagePath: 'home/seat-selection',
    },
  ],
} as const;

/**
 * The CMS seat selection content.
 * @see {@link CB_SEAT_SELECTION_CMS_FALLBACK_CONTENT}
 */
export type CbSeatSelectionCmsContent =
  typeof CB_SEAT_SELECTION_CMS_FALLBACK_CONTENT;

/** The CMS content for the "select seat" page */
export type CbSelectSeatCmsContent =
  CbSeatSelectionCmsContent['area'][1]['component'][0]['data'];
