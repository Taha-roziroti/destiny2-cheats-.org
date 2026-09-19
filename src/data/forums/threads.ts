import { destinyImages } from '../destiny';
import type { ForumThread } from './types';

const sharedReplies = {
	setupHelp: [
		{ author: 'Kade_07', date: '2026-08-02', body: 'Took me maybe twelve minutes. I kept FOV low on day one and nothing felt off in three Crucible matches.' },
		{ author: 'mira.rift', date: '2026-08-03', body: 'Setup was fine but I wish the written steps had a screenshot for the loader screen. Got there eventually.' },
		{ author: 'TrialsGrinder', date: '2026-08-05', body: 'Ran it in a private match first. Way less panic than jumping straight into Trials.' },
	],
	aimbotMixed: [
		{ author: 'snipezonly', date: '2026-07-28', body: 'Smooth aim at 3–4 FOV looks natural on sniper lines. Won two Trials cards without feeling like a magnet.' },
		{ author: 'ctrl_player99', date: '2026-07-29', body: 'Pushed FOV to 8 and got called out in voice. Dialed back and it stopped.' },
		{ author: 'patchdaymike', date: '2026-07-30', body: 'After the last BattlEye week I sat out two days, checked status, then played. No drama.' },
		{ author: 'rankedgrind42', date: '2026-08-01', body: 'Still learning recoil pairing. Aimbot alone does not fix bad peek timing.' },
	],
	espMixed: [
		{ author: 'buildsr4k', date: '2026-08-04', body: 'Skeleton ESP in raids saved my fireteam twice. Loot filters keep the screen readable.' },
		{ author: 'lootgoblinx', date: '2026-08-06', body: 'Wallhack is great in PvE. In Crucible I turn half the filters off or it gets noisy.' },
		{ author: 'vanlifeeft', date: '2026-08-07', body: 'Radar plus ESP is the combo. I stopped getting flanked in Survival.' },
	],
	buyMixed: [
		{ author: 'stormchaser07', date: '2026-08-08', body: 'Lifetime made sense for me. Same build after two patches so far.' },
		{ author: 'xkrypt0', date: '2026-08-09', body: 'Monthly is enough to test. Support answered my loader question same night.' },
		{ author: 'dma_wizard', date: '2026-08-10', body: 'Price is not the cheapest on the market. Feature list is why I stayed.' },
		{ author: 'skeptical_guardian', date: '2026-08-11', body: 'First week was rough — I skipped a patch day and rushed in. User error, not the tool.' },
	],
};

export const forumThreads: ForumThread[] = [
	{
		id: 'aimbot-ban-risk',
		slug: 'aimbot-settings-ban-risk',
		category: 'Aimbot',
		title: 'Aimbot Settings: What Level & Why Won\'t I Get Banned?',
		metaTitle: 'Destiny 2 Aimbot Settings — FOV, Smoothing & Risk',
		metaDescription: 'Destiny 2 cheats aimbot settings explained — FOV, smoothing, and play habits that keep Crucible sessions looking normal on Windows PC.',
		published: '2026-07-22',
		updated: '2026-09-10',
		imageSrc: destinyImages.aimbotCombat,
		imageAlt: 'Destiny 2 aimbot overlay with target box in Crucible PvP',
		intro: 'Everyone asks for max FOV on day one. That is usually how you get reported before you get value out of the license. Here is a practical aimbot setup for Destiny 2 that still wins gunfights.',
		sections: [
			{
				h2: 'Start conservative on FOV and smoothing',
				paragraphs: [
					'Open with FOV between 3 and 5 and smoothing above 6. Snappy tracking reads obvious on kill cams. Soft pull toward head level looks closer to a good mouse player.',
					'Pair aimbot with the <a href="/destiny-2-esp/">ESP page</a> so you are not locking through walls. Visibility checks exist for a reason.',
				],
			},
			{
				h2: 'When to turn it off',
				paragraphs: [
					'Disable assist during super trades and shotgun rushes. Manual flicks in close range look cleaner and you keep control of timing.',
					'Check the <a href="/status/">status page</a> after major patches before long Trials sessions.',
				],
			},
		],
		replies: sharedReplies.aimbotMixed,
	},
	{
		id: 'how-to-use',
		slug: 'how-to-use-destiny-2-cheats',
		category: 'Setup',
		title: 'Instructions to Use Destiny 2 Cheats (First Session)',
		metaTitle: 'How to Use Destiny 2 Cheats — Setup & First Match',
		metaDescription: 'Destiny 2 cheats setup walkthrough — install, loader, ESP and aimbot toggles, and a safe first Crucible session on Windows PC.',
		published: '2026-07-18',
		updated: '2026-09-08',
		imageSrc: destinyImages.cheatsCombat,
		imageAlt: 'Destiny 2 cheat menu with ESP and aimbot toggles on PC',
		intro: 'If you just got a license, do not queue Trials in the first ten minutes. Run through setup, private match, then one casual list.',
		sections: [
			{
				h2: 'Install order that actually works',
				paragraphs: [
					'Follow the <a href="/setup/">setup guide</a> in order: loader, overlay, then feature toggles. Skipping the BattlEye note on patch weeks is how people blame the wrong thing.',
					'Bind hotkeys for ESP, radar, and aimbot separately so you can drop features mid-match without alt-tabbing.',
				],
			},
			{
				h2: 'First Crucible checklist',
				paragraphs: [
					'Run one Control match with ESP + radar only. Add aimbot next match at low FOV. Save aggressive configs for when you understand the lobby pace.',
					'Compare plans on <a href="/pricing/">pricing</a> if you need lifetime versus monthly.',
				],
			},
		],
		replies: sharedReplies.setupHelp,
	},
	{
		id: 'esp-features',
		slug: 'destiny-2-esp-wallhack-features',
		category: 'ESP',
		title: 'Destiny 2 ESP & Wallhack Features — What You Actually Get',
		metaTitle: 'Destiny 2 ESP & Wallhack Features Guide',
		metaDescription: 'Destiny 2 cheats ESP and wallhack breakdown — skeleton boxes, loot filters, distance readouts, and Crucible vs PvE presets on PC.',
		published: '2026-07-20',
		updated: '2026-09-09',
		imageSrc: destinyImages.espWallhack,
		imageAlt: 'Destiny 2 ESP wallhack showing enemy skeleton through cover',
		intro: 'ESP is the reason most buyers keep the sub past week one. Aimbot wins a duel; wallhack wins the map.',
		sections: [
			{
				h2: 'Box ESP vs skeleton',
				paragraphs: [
					'Boxes are fast to read in Crucible. Skeleton lines help tracking movement in raids when names stack.',
					'Use filters so bosses, guardians, and loot do not paint the whole screen. The <a href="/features/">features list</a> matches what is in-client.',
				],
			},
			{
				h2: 'Wallhack without clutter',
				paragraphs: [
					'Distance text matters more than glow effects. Turn off loot ESP in Trials; turn it on for dungeon farms.',
					'See the full <a href="/d2-cheats/">cheats package</a> for radar and aimbot in the same license.',
				],
			},
		],
		replies: sharedReplies.espMixed,
	},
	{
		id: 'aimbot-setup',
		slug: 'destiny-2-aimbot-setup-guide',
		category: 'Aimbot',
		title: 'Destiny 2 Aimbot Setup for Hand Cannons & Snipers',
		metaTitle: 'Destiny 2 Aimbot Setup — Snipers & Hand Cannons',
		metaDescription: 'Destiny 2 aimbot setup for snipers and hand cannons — bone selection, triggerbot, and recoil pairing for PvP on Windows PC.',
		published: '2026-07-25',
		updated: '2026-09-07',
		imageSrc: destinyImages.aimbotSkeleton,
		imageAlt: 'Destiny 2 aimbot precision overlay on hand cannon duel',
		intro: 'Different weapon families need different aim profiles. Copying a streamer config for a scout when you main sniper is wasted time.',
		sections: [
			{
				h2: 'Sniper lines',
				paragraphs: [
					'Lower FOV, higher smoothing, head bone only. Let triggerbot handle the click timing if your ping spikes.',
					'Practice in Rumble before Trials. One clean pick matters more than stat padding.',
				],
			},
			{
				h2: 'Hand cannon strafe fights',
				paragraphs: [
					'Slightly wider FOV with recoil control on. Aim assist should finish the last 20%, not the whole swipe.',
					'Read <a href="/destiny-2-aimbot/">aimbot controls</a> for the full toggle list.',
				],
			},
		],
		replies: [
			{ author: 'snipezonly', date: '2026-08-01', body: 'HC config here finally stopped my over-flicking. Took a night of tweaking.' },
			{ author: 'new_light_22', date: '2026-08-03', body: 'Did not know bone select mattered on sniper. Fixed in two minutes.' },
			{ author: 'TrialsGrinder', date: '2026-08-04', body: 'Still miss shots — but fewer than before. Good enough for flawless push.' },
		],
	},
	{
		id: 'crucible-tips',
		slug: 'crucible-esp-radar-tips',
		category: 'PvP',
		title: 'Crucible ESP & Radar Tips That Do Not Look Obvious',
		metaTitle: 'Destiny 2 Crucible ESP & Radar Tips',
		metaDescription: 'Destiny 2 cheats for Crucible — ESP, radar, and peek timing tips for Survival and Trials on Windows PC without loud overlays.',
		published: '2026-07-27',
		updated: '2026-09-06',
		imageSrc: destinyImages.playerEsp,
		imageAlt: 'Destiny 2 radar hack and ESP in Crucible Survival',
		intro: 'Crucible is information first. Most reports come from tracking through walls, not from winning a 1v1.',
		sections: [
			{
				h2: 'Radar before aimbot',
				paragraphs: [
					'Use <a href="/d2-radar/">radar</a> to set up angles, then decide if aimbot helps the duel. Prefiring every wall gets you clipped on stream.',
					'Survival rounds reward patience. ESP tells you when to push, not to push every frame.',
				],
			},
		],
		replies: [
			{ author: 'vanlifeeft', date: '2026-08-02', body: 'Radar saved me from a flank I never would have heard.' },
			{ author: 'ctrl_player99', date: '2026-08-03', body: 'Turned off box glow, kept distance text. Less obvious in kill cam.' },
			{ author: 'mira.rift', date: '2026-08-05', body: 'Still lost a 1v3. Info helps but positioning is still on you.' },
			{ author: 'rankedgrind42', date: '2026-08-06', body: 'Trials weekend with radar-only was my best card this season.' },
		],
	},
	{
		id: 'stream-proof',
		slug: 'stream-proof-overlay-settings',
		category: 'Overlay',
		title: 'Stream-Proof Overlay Settings for Discord Clips',
		metaTitle: 'Destiny 2 Stream-Proof Cheat Overlay Settings',
		metaDescription: 'Destiny 2 cheats stream-proof mode — hide ESP and radar from OBS and Discord captures while playing on Windows PC.',
		published: '2026-07-30',
		updated: '2026-09-05',
		imageSrc: destinyImages.cheatsCombat,
		imageAlt: 'Destiny 2 stream-proof cheat overlay hidden from capture software',
		intro: 'Clipping a raid clear is normal. Clipping your ESP boxes is not. Stream-proof mode exists for a reason.',
		sections: [
			{
				h2: 'What capture software sees',
				paragraphs: [
					'Enable stream-proof before you open OBS or Discord share. Overlays render on your monitor but stay out of most capture paths.',
					'Test with a ten-second local recording before you go live.',
				],
			},
		],
		replies: [
			{ author: 'buildsr4k', date: '2026-08-01', body: 'Discord clip test worked. Friends saw clean gameplay.' },
			{ author: 'skeptical_guardian', date: '2026-08-02', body: 'Forgot to toggle once. Deleted that clip fast.' },
		],
	},
	{
		id: 'buying-license',
		slug: 'buying-destiny-2-cheats-license',
		category: 'Store',
		title: 'Buying a Destiny 2 Cheats License — Monthly vs Lifetime',
		metaTitle: 'Buy Destiny 2 Cheats — Monthly vs Lifetime',
		metaDescription: 'Destiny 2 cheats pricing compared — monthly and lifetime licenses, delivery, and what is included in ESP, aimbot, and wallhack on PC.',
		published: '2026-08-01',
		updated: '2026-09-04',
		imageSrc: destinyImages.cheatsCombat,
		imageAlt: 'Destiny 2 cheats license plans for Windows PC',
		intro: 'Both plans ship the same feature stack. The question is how long you plan to play the season.',
		sections: [
			{
				h2: 'When monthly wins',
				paragraphs: [
					'Try the build for a month before you commit. Good if you only push Trials a few weekends.',
					'Instant delivery after checkout — see <a href="/pricing/">store</a> for current pricing.',
				],
			},
			{
				h2: 'When lifetime wins',
				paragraphs: [
					'If you raid and play Crucible year-round, lifetime breaks even fast. Same updates on both plans.',
				],
			},
		],
		replies: sharedReplies.buyMixed,
	},
	{
		id: 'patch-day',
		slug: 'patch-day-playbook',
		category: 'Updates',
		title: 'Patch Day Playbook — BattlEye Weeks & When to Queue',
		metaTitle: 'Destiny 2 Cheats Patch Day — BattlEye Updates',
		metaDescription: 'Destiny 2 cheats after patches — when to play, status checks, and BattlEye update habits for ESP and aimbot users on PC.',
		published: '2026-08-03',
		updated: '2026-09-11',
		imageSrc: destinyImages.playerEsp,
		imageAlt: 'Destiny 2 BattlEye patch status for cheat users',
		intro: 'Patch mornings are noisy. Half the community queues blind; the other half waits thirty minutes and has a normal night.',
		sections: [
			{
				h2: 'Check status before you click Play',
				paragraphs: [
					'Open the <a href="/status/">live status page</a> after Bungie or BattlEye posts. Maintenance notes beat Reddit panic.',
					'If a rebuild is marked in progress, play vanilla for a session or touch grass. Rushing is not a flex.',
				],
			},
		],
		replies: [
			{ author: 'patchdaymike', date: '2026-08-04', body: 'Waited one evening last month. Next morning everything was fine.' },
			{ author: 'dma_wizard', date: '2026-08-05', body: 'Did not wait. Had to reinstall loader. My fault.' },
			{ author: 'TrialsGrinder', date: '2026-08-06', body: 'Status page is boring but accurate. Trust it.' },
			{ author: 'xkrypt0', date: '2026-08-07', body: 'Email support was quick when I had a stale build.' },
			{ author: 'skeptical_guardian', date: '2026-08-08', body: 'Still think people overreact on patch day. Patience is free.' },
		],
	},
	{
		id: 'recoil-trigger',
		slug: 'recoil-triggerbot-settings',
		category: 'Aimbot',
		title: 'Recoil Control & Triggerbot — Pair With Aimbot or Solo?',
		metaTitle: 'Destiny 2 Recoil Control & Triggerbot Settings',
		metaDescription: 'Destiny 2 cheats recoil control and triggerbot settings — pair with aimbot or run solo for scout and pulse rifles on PC.',
		published: '2026-08-05',
		updated: '2026-09-03',
		imageSrc: destinyImages.aimbotCombat,
		imageAlt: 'Destiny 2 recoil control and triggerbot in PvP',
		intro: 'Triggerbot without discipline looks like a macro clip. Used right it fixes ping, not aim.',
		sections: [
			{
				h2: 'Recoil first, FOV second',
				paragraphs: [
					'Stabilize the weapon pattern before you add lock. Pulses and scouts feel best with light recoil assist.',
					'Full aimbot plus max recoil zero can look robotic on stream even with stream-proof on.',
				],
			},
		],
		replies: [
			{ author: 'rankedgrind42', date: '2026-08-06', body: 'Recoil only on my scout build. Aimbot off. Still climbing.' },
			{ author: 'snipezonly', date: '2026-08-07', body: 'Triggerbot on sniper with high ping actually helped.' },
			{ author: 'mira.rift', date: '2026-08-08', body: 'Overdid triggerbot, got reported in Rumble. Toned down delay.' },
		],
	},
	{
		id: 'radar-trials',
		slug: 'radar-trials-flank-control',
		category: 'Radar',
		title: 'Radar for Trials — Flank Control Without Hard Lock',
		metaTitle: 'Destiny 2 Radar Hack for Trials Flanks',
		metaDescription: 'Destiny 2 radar hack for Trials — flank detection, 2D map overlay, and pairing with ESP for Survival on Windows PC.',
		published: '2026-08-07',
		updated: '2026-09-02',
		imageSrc: '/images/destiny-2-cheats-radar.webp',
		imageAlt: 'Destiny 2 2D radar overlay showing enemy flanks in Trials',
		intro: 'Trials lives on flanks. Radar is the quiet feature that wins cards without touching aim.',
		sections: [
			{
				h2: '2D radar placement',
				paragraphs: [
					'Keep the radar near your minimap muscle memory. Color by threat, not by team theme.',
					'Stack with <a href="/destiny-2-esp/">ESP</a> when you rotate — radar says who, ESP says where to pre-aim.',
				],
			},
		],
		replies: [
			{ author: 'vanlifeeft', date: '2026-08-08', body: 'Flank callouts from radar got my trio flawless last weekend.' },
			{ author: 'lootgoblinx', date: '2026-08-09', body: 'Wish the radar dot size was smaller. Still usable.' },
			{ author: 'Kade_07', date: '2026-08-10', body: 'Ran radar-only in Trials. Less stress than full package.' },
			{ author: 'ctrl_player99', date: '2026-08-11', body: 'Teammates thought I had game sense. It was the overlay.' },
			{ author: 'new_light_22', date: '2026-08-12', body: 'Took a match to get used to. Worth it.' },
			{ author: 'skeptical_guardian', date: '2026-08-13', body: 'Radar will not fix bad callouts. Still need comms.' },
		],
	},
];