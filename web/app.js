/**
 * SafeBangla (সেফবাংলা) Web Application Logic
 * Next-Generation AI Disaster, Emergency Response & Zero-Network Resilience
 */

(function () {
  'use strict';

  // ==================== STATE MANAGEMENT ====================
  const state = {
    currentRole: 'citizen', // citizen | volunteer | hq
    lang: 'en', // en | bn
    isOnline: true,
    isSosActive: false,
    sosHolding: false,
    sosHoldProgress: 0,
    sosTimerId: null,
    isUserSafe: true,
    userLocation: { lat: 23.8103, lng: 90.4125, name: 'Dhaka Division' },
    batteryLevel: 84,

    familyMembers: [
      { id: 1, name: 'Fatima Begum (Mother)', nameBn: 'ফাতেমা বেগম (মা)', distKm: 2.4, status: 'safe', angle: 45 },
      { id: 2, name: 'Tanvir Ahmed (Brother)', nameBn: 'তানভীর আহমেদ (ভাই)', distKm: 6.8, status: 'danger', angle: 160 },
      { id: 3, name: 'Nusrat Jahan (Sister)', nameBn: 'নুসরাত জাহান (বোন)', distKm: 11.2, status: 'safe', angle: 290 },
      { id: 4, name: 'Kamal Hossain (Uncle)', nameBn: 'কামাল হোসেন (চাচা)', distKm: 14.1, status: 'offline', angle: 210 }
    ],

    shelters: [
      {
        id: 'SH-01',
        name: 'Cox\'s Bazar Central Cyclone Center',
        nameBn: 'কক্সবাজার কেন্দ্রীয় ঘূর্ণিঝড় আশ্রয়কেন্দ্র',
        division: 'chittagong',
        capacity: 1200,
        occupied: 1110, // 92.5% -> OVERLOAD
        distanceKm: 3.2,
        hasLivestockPen: true,
        solarPower: true
      },
      {
        id: 'SH-02',
        name: 'Teknaf Coastal Multi-Purpose Shelter',
        nameBn: 'টেকনাফ উপকূলীয় বহুমুখী আশ্রয়কেন্দ্র',
        division: 'chittagong',
        capacity: 850,
        occupied: 560, // 65.8% -> AVAILABLE
        distanceKm: 4.8,
        hasLivestockPen: true,
        solarPower: true
      },
      {
        id: 'SH-03',
        name: 'Patuakhali Coastal Cyclone Redoubt',
        nameBn: 'পটুয়াখালী উপকূলীয় ঘূর্ণিঝড় আশ্রয়স্থল',
        division: 'barishal',
        capacity: 950,
        occupied: 890, // 93.6% -> OVERLOAD
        distanceKm: 2.1,
        hasLivestockPen: true,
        solarPower: false
      },
      {
        id: 'SH-04',
        name: 'Kuakata High-Plinth Flood Refuge',
        nameBn: 'কুয়াকাটা প্লাবনভূমি নিরাপদ আশ্রয়কেন্দ্র',
        division: 'barishal',
        capacity: 1400,
        occupied: 810, // 57.8% -> AVAILABLE
        distanceKm: 5.6,
        hasLivestockPen: true,
        solarPower: true
      },
      {
        id: 'SH-05',
        name: 'Sylhet Haor Flash-Flood Elevated Shelter',
        nameBn: 'সিলেট হাওর আকস্মিক বন্যা আশ্রয়কেন্দ্র',
        division: 'sylhet',
        capacity: 1100,
        occupied: 980, // 89.1% -> NEAR FULL
        distanceKm: 1.9,
        hasLivestockPen: false,
        solarPower: true
      },
      {
        id: 'SH-06',
        name: 'Sunamganj Sadar Flood Relief Center',
        nameBn: 'সুনামগঞ্জ সদর বন্যা পুনর্বাসন কেন্দ্র',
        division: 'sylhet',
        capacity: 1300,
        occupied: 720, // 55.3% -> AVAILABLE
        distanceKm: 4.1,
        hasLivestockPen: true,
        solarPower: true
      }
    ],

    hospitals: [
      {
        id: 'HOSP-01',
        name: 'Dhaka Medical College & Hospital (DMCH)',
        nameBn: 'ঢাকা মেডিকেল কলেজ হাসপাতাল',
        icuAvailable: 3,
        erBeds: 18,
        oxygenUnits: 'Normal',
        phone: '02-55165088',
        distanceKm: 1.8
      },
      {
        id: 'HOSP-02',
        name: 'Chittagong Medical College Hospital (CMCH)',
        nameBn: 'চট্টগ্রাম মেডিকেল কলেজ হাসপাতাল',
        icuAvailable: 1,
        erBeds: 11,
        oxygenUnits: 'Critical Reserve',
        phone: '031-619400',
        distanceKm: 4.2
      },
      {
        id: 'HOSP-03',
        name: 'Sylhet MAG Osmani Medical College',
        nameBn: 'সিলেট এম এ জি ওসমানী মেডিকেল কলেজ',
        icuAvailable: 5,
        erBeds: 24,
        oxygenUnits: 'Abundant',
        phone: '0821-713487',
        distanceKm: 2.5
      },
      {
        id: 'HOSP-04',
        name: 'Sher-e-Bangla Medical College (Barishal)',
        nameBn: 'শের-ই-বাংলা মেডিকেল কলেজ, বরিশাল',
        icuAvailable: 2,
        erBeds: 9,
        oxygenUnits: 'Normal',
        phone: '0431-217354',
        distanceKm: 3.8
      }
    ],

    missions: [
      {
        id: 'MSN-901',
        victimName: 'Anowar Karim & 4 Family Members',
        location: 'Chakaria, Cox\'s Bazar (Submerged Compound)',
        severity: 'CRITICAL',
        issue: 'Flood surge trapped family on corrugated rooftop with infant.',
        timestamp: '3m ago',
        claimedBy: null
      },
      {
        id: 'MSN-902',
        victimName: 'Sufia Khatun (72 yrs)',
        location: 'Companiganj, Sylhet (Flash Flood)',
        severity: 'CRITICAL',
        issue: 'Elderly diabetic patient needing emergency boat evacuation.',
        timestamp: '9m ago',
        claimedBy: null
      },
      {
        id: 'MSN-903',
        victimName: 'Farhan Mahmud',
        location: 'Char Fasson, Bhola',
        severity: 'HIGH',
        issue: 'Collapsed fishing trawler dock, 3 minor laceration injuries.',
        timestamp: '16m ago',
        claimedBy: 'Vol. Rafiqul (Team 4)'
      }
    ],

    hazards: [
      {
        id: 'HZ-101',
        title: 'High Voltage Live Wire Submerged in Water',
        titleBn: 'রাস্তায় পানিতে নিমজ্জিত উচ্চ ক্ষমতার বিদ্যুতের তার',
        location: 'Amberkhana Point, Sylhet',
        votes: 38,
        reportedBy: 'Kazi M.',
        time: '12m ago'
      },
      {
        id: 'HZ-102',
        title: 'Collapsed Wooden Culvert - Path Impassable',
        titleBn: 'ভাঙা কাঠের কালভার্ট - চলাচলের অনুপযোগী',
        location: 'Kuakata Marine Drive, Patuakhali',
        votes: 24,
        reportedBy: 'Sajib R.',
        time: '34m ago'
      },
      {
        id: 'HZ-103',
        title: 'Giant Banyan Tree Blocking Fire Truck Access',
        titleBn: 'রাস্তায় ভেঙে পড়া বটগাছ - ফায়ার সার্ভিসের গাড়ি আটকে আছে',
        location: 'Mirsharai Highway, Chittagong',
        votes: 56,
        reportedBy: 'Tariq H.',
        time: '1h ago'
      }
    ],

    volunteers: [
      { rank: 1, name: 'Tanvir Hossain', district: 'Sylhet', missions: 48, xp: 3420, badges: ['🏆 Hero', '🌊 Flood Elite'] },
      { rank: 2, name: 'Shahana Akter', district: 'Cox\'s Bazar', missions: 41, xp: 2980, badges: ['🩺 First Aid Pro', '🌪️ Cyclone Vet'] },
      { rank: 3, name: 'Mohammad Rashed', district: 'Patuakhali', missions: 36, xp: 2650, badges: ['🚤 Boatmaster', '⚡ Quick Responder'] },
      { rank: 4, name: 'Nilufa Yeasmin', district: 'Chittagong', missions: 29, xp: 2190, badges: ['📡 Comms Leader'] },
      { rank: 5, name: 'Arifur Rahman', district: 'Barishal', missions: 25, xp: 1850, badges: ['🤝 Community Star'] }
    ],

    drones: [
      { id: 'DRONE-01', model: 'AeroRescue-V2', battery: 89, payload: 'Insulin & First Aid', status: 'IN_FLIGHT', altitude: '120m', speed: '48 km/h', target: 'Sylhet Flood Zone' },
      { id: 'DRONE-02', model: 'SkyLifter-Heavy', battery: 64, payload: 'Water Purification Tabs (500x)', status: 'IN_FLIGHT', altitude: '95m', speed: '42 km/h', target: 'Patuakhali Coastal Island' },
      { id: 'DRONE-03', model: 'MedDrop-Swift', battery: 100, payload: 'ORS & Antivenom Serum', status: 'STANDBY', altitude: '0m', speed: '0 km/h', target: 'Dhaka Emergency Depot' }
    ],

    waterGauges: [
      { river: 'Surma River (Sylhet Point)', level: 11.48, danger: 11.00, status: 'DANGER', delta: '+0.48m' },
      { river: 'Padma River (Goalundo Point)', level: 8.75, danger: 9.30, status: 'WARNING', delta: '-0.55m' },
      { river: 'Jamuna River (Bahadurabad)', level: 19.82, danger: 19.50, status: 'DANGER', delta: '+0.32m' },
      { river: 'Karnaphuli River (Chittagong)', level: 4.10, danger: 4.80, status: 'NORMAL', delta: '-0.70m' }
    ]
  };

  // ==================== I18N DICTIONARY ====================
  const translations = {
    en: {
      bmdAlertTitle: 'BMD DANGER ADVISORY NO. 7',
      tickerContent: '⚠️ Cyclone Warning: Severe cyclonic storm over Bay of Bengal moving NNE towards Barishal & Chittagong. | 🌊 Surma River in Sylhet flowing 48cm above danger mark. | 📞 National Helpline 999 & Disaster Early Warning 1090 active 24/7.',
      heroTagline: 'Crisis Intelligence & Zero-Network Resilience',
      roleCitizen: 'Citizen Portal',
      roleVolunteer: 'Volunteer & Rescue',
      roleHq: 'Command HQ & Fleet',
      aiAssistantBtn: 'AI Safety Guide',
      sosEyebrow: 'CRITICAL EMERGENCY',
      sosCardTitle: 'Instant SOS Distress Beacon',
      sosCardDesc: 'Press and hold the button for 3 seconds to broadcast an emergency distress beacon. Automatically captures GPS telemetry, battery level, and initiates a 10s silent recording.',
      holdToTrigger: 'HOLD 3s',
      sosBroadcastActive: 'EMERGENCY SOS BROADCASTED!',
      cancelSos: 'Cancel SOS',
      offlineSmsTitle: 'Zero-Network SMS Fallback',
      offlineSmsDesc: 'If cellular data drops, tap below to transmit this compressed payload via GSM text to gateway 999.',
      copyPayload: 'Copy Payload',
      sendViaSms: 'Send SMS to 999',
      familyRadarTag: 'P2P SAFETY NETWORK',
      familyRadarTitle: 'Family Circle & 15km Panic Radar',
      iAmSafeBtn: 'I AM SAFE (সবাই নিরাপদ)',
      familyRadarDesc: 'Live sweeping radar tracking registered family members and relative distance during crisis events.',
      sheltersTag: 'SMART LOAD BALANCER',
      sheltersTitle: 'Safe Shelters & Real-Time Capacity',
      balancerNotice: 'Smart Queue Balancer Active:',
      balancerDetail: 'Facilities exceeding 90% capacity automatically suggest alternate open shelters within 4km radius to prevent stampedes.',
      hospitalTag: 'HEALTH INFRASTRUCTURE',
      hospitalTitle: 'Nearby Emergency Hospitals & ICU',
      quickAmbulanceBtn: 'Request Ambulance',
      hotlineTag: '24/7 TOLL-FREE DIRECTORY',
      hotlineTitle: 'National Disaster & Emergency Response Hotlines',
      hotlineSub: 'Direct one-tap dialing to all national emergency gateways in Bangladesh.',
      statPendingSos: 'Pending SOS Signals',
      statActiveVolunteers: 'Volunteers in Field',
      statRescuedToday: 'Citizens Rescued (24h)',
      statAirdrops: 'Drone Airdrops Delivered',
      missionEyebrow: 'RADAR DISPATCH',
      missionTitle: 'Unassigned Emergency Distress Signals',
      hazardEyebrow: 'COMMUNITY INTEL',
      hazardTitle: 'Crowdsourced Incident & Road Block Feed',
      reportIncidentBtn: 'Report Incident',
      leaderboardTag: 'RECOGNITION & HONORS',
      leaderboardTitle: 'Top Crisis Responders & Service Badges',
      genCertBtn: 'Generate Service Certificate',
      droneEyebrow: 'AUTONOMOUS DISPATCH',
      droneTitle: 'Autonomous Drone & Ground Delivery Fleet',
      iotEyebrow: 'HYDROLOGICAL TELEMETRY',
      iotTitle: 'IoT River Basin Water Level Sensors',
      iotDesc: 'Continuous real-time telemetry from automated ultrasonic water gauges deployed across flood-vulnerable river points in Bangladesh.',
      strategicTag: 'NATIONAL CAPACITY',
      strategicTitle: 'Shelter Load Balancer & Dynamic Redistribution Grid'
    },
    bn: {
      bmdAlertTitle: 'বিএমডি মহাবিপদ সংকেত ৭',
      tickerContent: '⚠️ ঘূর্ণিঝড় সতর্কতা: বঙ্গোপসাগরে সৃষ্ট তীব্র ঘূর্ণিঝড় বরিশাল ও চট্টগ্রাম উপকূলের দিকে ধাবিত হচ্ছে। | 🌊 সুরমা নদীর পানি বিপদসীমার ৪৮ সেমি ওপর দিয়ে প্রবাহিত। | 📞 জাতীয় জরুরি সেবা ৯৯৯ এবং দুর্যোগ বার্তা ১০৯০ সার্বক্ষণিক সচল।',
      heroTagline: 'দুর্যোগ ব্যবস্থাপনা ও অফলাইন রেজিলিয়েন্স ইকোসিস্টেম',
      roleCitizen: 'নাগরিক সেবা',
      roleVolunteer: 'উদ্ধারকারী দল',
      roleHq: 'কমান্ড হেডকোয়ার্টার',
      aiAssistantBtn: 'এআই আপদকালীন গাইড',
      sosEyebrow: 'জরুরি জীবনরক্ষা',
      sosCardTitle: 'তাৎক্ষণিক এসওএস (SOS) ডিসট্রেস বীকন',
      sosCardDesc: 'জরুরি সাহায্য পাঠাতে বাটনটি ৩ সেকেন্ড চেপে ধরে রাখুন। স্বয়ংক্রিয়ভাবে জিপিএস অবস্থান, ব্যাটারি স্তর রেকর্ড করে ১০ সেকেন্ডের সাইলেন্ট অডিওসহ প্রেরণ করবে।',
      holdToTrigger: '৩ সে. চেপে ধরুন',
      sosBroadcastActive: 'জরুরি এসওএস সিগন্যাল প্রেরিত হয়েছে!',
      cancelSos: 'এসওএস বাতিল করুন',
      offlineSmsTitle: 'জিরো-নেটওয়ার্ক এসএমএস ব্যাকআপ',
      offlineSmsDesc: 'মোবাইল ইন্টারনেট না থাকলে নিচের কম্প্রেসড পে-লোডটি সরাসরি এসএমএস-এর মাধ্যমে ৯৯৯ নম্বরে পাঠিয়ে দিন।',
      copyPayload: 'পে-লোড কপি করুন',
      sendViaSms: '৯৯৯-এ এসএমএস পাঠান',
      familyRadarTag: 'পিয়ার-টু-পিয়ার পরিবার নেটওয়ার্ক',
      familyRadarTitle: 'পারিবারিক সুরক্ষা বলয় ও ১৫ কিমি প্যানিক রাডার',
      iAmSafeBtn: 'আমি নিরাপদ আছি',
      familyRadarDesc: 'দুর্যোগকালীন সময়ে পরিবারের সদস্যদের বর্তমান দূরত্ব ও নিরাপত্তা অবস্থান লাইভ রাডারে মনিটর করুন।',
      sheltersTag: 'স্মার্ট লোড ব্যালেন্সার',
      sheltersTitle: 'নিরাপদ আশ্রয়কেন্দ্র ও রিয়েল-টাইম ধারণক্ষমতা',
      balancerNotice: 'স্মার্ট কিউ ব্যালেন্সার সক্রিয়:',
      balancerDetail: 'যেসব আশ্রয়কেন্দ্র ৯০% পূর্ণ হয়ে গেছে, দুর্ঘটনা এড়াতে নিকটস্থ খালি কেন্দ্রে স্বয়ংক্রিয়ভাবে স্থানান্তরের পরামর্শ দেওয়া হচ্ছে।',
      hospitalTag: 'জরুরি স্বাস্থ্য পরিকাঠামো',
      hospitalTitle: 'নিকটবর্তী জরুরি হাসপাতাল ও আইসিইউ',
      quickAmbulanceBtn: 'অ্যাম্বুলেন্স কল করুন',
      hotlineTag: '২৪/৭ জরুরি হটলাইন ডিরেক্টরি',
      hotlineTitle: 'জাতীয় দুর্যোগ ও উদ্ধারকারী সংস্থার হেল্পলাইন',
      hotlineSub: 'এক ট্যাপে সরাসরি যোগাযোগ করুন বাংলাদেশের যেকোনো জরুরি সেবায়।',
      statPendingSos: 'অমীমাংসিত এসওএস সিগন্যাল',
      statActiveVolunteers: 'মাঠে কর্মরত উদ্ধারকারী',
      statRescuedToday: 'উদ্ধারকৃত নাগরিক (২৪ ঘণ্টা)',
      statAirdrops: 'ড্রোন এয়ারড্রপ বিতরণ',
      missionEyebrow: 'রাডার ডিসপ্যাচ',
      missionTitle: 'অ্যাসাইন না করা জরুরি উদ্ধার মিশন',
      hazardEyebrow: 'কমিউনিটি তথ্য',
      hazardTitle: 'জনসাধারণের রিপোর্টকৃত বিপদ ও সড়ক অবরোধ',
      reportIncidentBtn: 'বিপদ রিপোর্ট করুন',
      leaderboardTag: 'স্বীকৃতি ও সম্মাননা',
      leaderboardTitle: 'সেরা ক্রাইসিস রেসপন্ডার ও সার্ভিস ব্যাজ',
      genCertBtn: 'সার্ভিস সার্টিফিকেট তৈরি করুন',
      droneEyebrow: 'স্বয়ংক্রিয় এয়ারড্রপ',
      droneTitle: 'স্বয়ংক্রিয় উদ্ধারকারী ড্রোন ও ত্রাণ বহর',
      iotEyebrow: 'হাইড্রোলজিক্যাল টেলিমেট্রি',
      iotTitle: 'আইওটি নদীর পানি স্তর পর্যবেক্ষণ সেন্সর',
      iotDesc: 'বাংলাদেশের প্রধান নদ-নদীর পানির স্তর স্বয়ংক্রিয় আল্ট্রাসনিক সেন্সরের মাধ্যমে সার্বক্ষণিক রিয়েল-টাইম পর্যবেক্ষণ।',
      strategicTag: 'জাতীয় ধারণক্ষমতা',
      strategicTitle: 'আশ্রয়কেন্দ্র লোড ব্যালেন্সার ও পুনর্বণ্টন গ্রিড'
    }
  };

  // ==================== AUDIO SYNTHESIZER (WEB AUDIO API) ====================
  let audioCtx = null;
  function getAudioContext() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioCtx;
  }

  function playTone(freq, type = 'sine', duration = 0.15, vol = 0.1) {
    try {
      const ctx = getAudioContext();
      if (ctx.state === 'suspended') ctx.resume();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(vol, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      // Audio autoplay restrictions or unsupported
    }
  }

  function playSosAlarm() {
    playTone(880, 'sawtooth', 0.2, 0.2);
    setTimeout(() => playTone(1200, 'sawtooth', 0.3, 0.25), 180);
    setTimeout(() => playTone(880, 'sawtooth', 0.2, 0.2), 450);
  }

  // ==================== INITIALIZATION & EVENT BINDINGS ====================
  document.addEventListener('DOMContentLoaded', () => {
    initRoleNavigation();
    initLanguage();
    initNetworkSimulator();
    initSosButton();
    initFamilyRadar();
    initSheltersAndHospitals();
    initMissionsAndHazards();
    initLeaderboard();
    initDronesAndIot();
    initAiChatbot();
    initModals();
    attemptBrowserGeolocation();
  });

  // ==================== ROLES & NAVIGATION ====================
  function initRoleNavigation() {
    const roleButtons = document.querySelectorAll('.role-btn');
    const viewPanels = {
      citizen: document.getElementById('citizenView'),
      volunteer: document.getElementById('volunteerView'),
      hq: document.getElementById('hqView')
    };

    roleButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const role = btn.dataset.role;
        state.currentRole = role;

        roleButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        Object.keys(viewPanels).forEach(key => {
          if (key === role) {
            viewPanels[key].classList.add('active');
          } else {
            viewPanels[key].classList.remove('active');
          }
        });

        playTone(600, 'sine', 0.08, 0.05);
      });
    });
  }

  // ==================== I18N SWITCHER ====================
  function initLanguage() {
    const toggleBtn = document.getElementById('langToggleBtn');
    const label = document.getElementById('currentLangLabel');

    toggleBtn.addEventListener('click', () => {
      state.lang = state.lang === 'en' ? 'bn' : 'en';
      label.textContent = state.lang === 'en' ? 'বাংলা' : 'English';
      applyTranslations();
      renderFamilyList();
      renderShelters();
      renderHospitals();
      playTone(750, 'sine', 0.08, 0.05);
    });
  }

  function applyTranslations() {
    const dict = translations[state.lang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.textContent = dict[key];
      }
    });

    // Update SOS button label if not in progress
    const sosStateText = document.getElementById('sosStateText');
    if (!state.isSosActive && sosStateText) {
      sosStateText.textContent = dict.holdToTrigger;
    }
  }

  // ==================== NETWORK SIMULATOR ====================
  function initNetworkSimulator() {
    const toggleBtn = document.getElementById('networkToggleBtn');
    const label = document.getElementById('networkStatusText');

    toggleBtn.addEventListener('click', () => {
      state.isOnline = !state.isOnline;
      if (state.isOnline) {
        toggleBtn.className = 'pill-btn status-online';
        label.textContent = 'ONLINE (4G/LTE)';
        playTone(900, 'sine', 0.1, 0.08);
      } else {
        toggleBtn.className = 'pill-btn status-offline';
        label.textContent = 'OFFLINE (SMS/BLE MESH)';
        playTone(350, 'square', 0.2, 0.1);
      }
    });
  }

  // ==================== GEOLOCATION ====================
  function attemptBrowserGeolocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          state.userLocation.lat = parseFloat(pos.coords.latitude.toFixed(4));
          state.userLocation.lng = parseFloat(pos.coords.longitude.toFixed(4));
          updateTelemetryDisplay();
        },
        () => {
          // Fallback to Dhaka coordinates
          updateTelemetryDisplay();
        },
        { timeout: 5000 }
      );
    } else {
      updateTelemetryDisplay();
    }

    if ('getBattery' in navigator) {
      navigator.getBattery().then(bat => {
        state.batteryLevel = Math.round(bat.level * 100);
        updateTelemetryDisplay();
      }).catch(() => {});
    }
  }

  function updateTelemetryDisplay() {
    const coordsEl = document.getElementById('geoCoordsDisplay');
    const payloadEl = document.getElementById('smsPayloadContent');
    const smsLink = document.getElementById('dispatchSmsLink');

    const latStr = `${state.userLocation.lat}° N`;
    const lngStr = `${state.userLocation.lng}° E`;
    if (coordsEl) coordsEl.textContent = `${latStr}, ${lngStr} (${state.userLocation.name})`;

    const payload = `SB-SOS|LAT:${state.userLocation.lat}|LNG:${state.userLocation.lng}|BAT:${state.batteryLevel}%|ACC:3m|TS:${Date.now().toString().slice(-6)}`;
    if (payloadEl) payloadEl.textContent = payload;
    if (smsLink) smsLink.href = `sms:999?body=${encodeURIComponent(payload)}`;
  }

  // ==================== EMERGENCY SOS BUTTON (3-SECOND HOLD) ====================
  function initSosButton() {
    const btn = document.getElementById('masterSosBtn') || document.getElementById('sosMasterBtn');
    const progressCircle = document.getElementById('sosProgressCircle');
    const banner = document.getElementById('sosAlertBanner');
    const cancelBtn = document.getElementById('cancelSosBtn');
    const stateText = document.getElementById('sosStateText');
    const copyPayloadBtn = document.getElementById('copySmsPayloadBtn');

    if (!btn || !progressCircle) return;

    const circumference = 2 * Math.PI * 74; // ~464.95
    progressCircle.style.strokeDasharray = `${circumference}`;
    progressCircle.style.strokeDashoffset = `${circumference}`;

    function startHold(e) {
      if (state.isSosActive) return;
      e.preventDefault();
      state.sosHolding = true;
      btn.classList.add('holding');
      playTone(440, 'triangle', 0.1, 0.1);

      const startTime = Date.now();
      const holdDuration = 3000; // 3 seconds

      state.sosTimerId = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(1, elapsed / holdDuration);
        const offset = circumference - (progress * circumference);
        progressCircle.style.strokeDashoffset = `${offset}`;

        const remainingSeconds = Math.max(1, Math.ceil((holdDuration - elapsed) / 1000));
        stateText.textContent = `${remainingSeconds}s...`;

        // Beep frequency increases
        if (Math.floor(elapsed / 500) > Math.floor((elapsed - 50) / 500)) {
          playTone(500 + progress * 500, 'sine', 0.08, 0.08);
        }

        if (progress >= 1) {
          clearInterval(state.sosTimerId);
          triggerEmergencySos();
        }
      }, 50);
    }

    function cancelHold() {
      if (state.isSosActive || !state.sosHolding) return;
      state.sosHolding = false;
      btn.classList.remove('holding');
      clearInterval(state.sosTimerId);
      progressCircle.style.strokeDashoffset = `${circumference}`;
      stateText.textContent = translations[state.lang].holdToTrigger;
    }

    btn.addEventListener('mousedown', startHold);
    btn.addEventListener('touchstart', startHold);
    window.addEventListener('mouseup', cancelHold);
    window.addEventListener('touchend', cancelHold);

    if (cancelBtn) {
      cancelBtn.addEventListener('click', () => {
        state.isSosActive = false;
        banner.classList.add('hidden');
        progressCircle.style.strokeDashoffset = `${circumference}`;
        stateText.textContent = translations[state.lang].holdToTrigger;
        playTone(300, 'sine', 0.2, 0.1);
      });
    }

    if (copyPayloadBtn) {
      copyPayloadBtn.addEventListener('click', () => {
        const payloadText = document.getElementById('smsPayloadContent').textContent;
        navigator.clipboard.writeText(payloadText).then(() => {
          copyPayloadBtn.textContent = 'Copied!';
          setTimeout(() => {
            copyPayloadBtn.textContent = translations[state.lang].copyPayload;
          }, 2000);
          playTone(800, 'sine', 0.1, 0.05);
        });
      });
    }
  }

  function triggerEmergencySos() {
    state.isSosActive = true;
    state.sosHolding = false;
    const banner = document.getElementById('sosAlertBanner');
    const stateText = document.getElementById('sosStateText');
    const packetIdEl = document.getElementById('sosPacketId');

    if (banner) banner.classList.remove('hidden');
    if (stateText) stateText.textContent = 'ACTIVE!';
    if (packetIdEl) {
      packetIdEl.textContent = `SB-${Math.floor(10000 + Math.random() * 90000)}-SOS`;
    }

    playSosAlarm();

    // Add a mission to the volunteer missions list automatically
    const newMission = {
      id: `MSN-${Math.floor(100 + Math.random() * 900)}`,
      victimName: 'Citizen SOS Beacon (You)',
      location: `${state.userLocation.name} (${state.userLocation.lat}, ${state.userLocation.lng})`,
      severity: 'CRITICAL',
      issue: 'One-Tap emergency SOS broadcasted. Battery ' + state.batteryLevel + '%.',
      timestamp: 'Just now',
      claimedBy: null
    };
    state.missions.unshift(newMission);
    renderMissions();
  }

  // ==================== FAMILY RADAR CANVAS ====================
  function initFamilyRadar() {
    const canvas = document.getElementById('familyRadarCanvas');
    const safeToggleBtn = document.getElementById('iamSafeToggleBtn');
    const safeText = document.getElementById('safeStatusText');

    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let angle = 0;

    function drawRadar() {
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;
      const maxRadius = Math.min(cx, cy) - 20;

      // Clear with dark fading trail
      ctx.fillStyle = 'rgba(11, 17, 32, 0.25)';
      ctx.fillRect(0, 0, w, h);

      // Draw concentric range rings (5km, 10km, 15km)
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.2)';
      ctx.lineWidth = 1;
      for (let i = 1; i <= 3; i++) {
        ctx.beginPath();
        const r = (maxRadius / 3) * i;
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = 'rgba(6, 182, 212, 0.5)';
        ctx.font = '9px monospace';
        ctx.fillText(`${i * 5}km`, cx + r - 24, cy - 4);
      }

      // Draw crosshairs
      ctx.beginPath();
      ctx.moveTo(cx - maxRadius, cy);
      ctx.lineTo(cx + maxRadius, cy);
      ctx.moveTo(cx, cy - maxRadius);
      ctx.lineTo(cx, cy + maxRadius);
      ctx.stroke();

      // Sweeping radar line
      angle += 0.035;
      const sweepX = cx + Math.cos(angle) * maxRadius;
      const sweepY = cy + Math.sin(angle) * maxRadius;

      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxRadius);
      grad.addColorStop(0, 'rgba(6, 182, 212, 0.4)');
      grad.addColorStop(1, 'rgba(6, 182, 212, 0.0)');

      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, maxRadius, angle - 0.35, angle);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();

      // Sweeping line
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(sweepX, sweepY);
      ctx.stroke();

      // Center (Self)
      ctx.fillStyle = state.isUserSafe ? '#10b981' : '#ef4444';
      ctx.beginPath();
      ctx.arc(cx, cy, 6, 0, Math.PI * 2);
      ctx.fill();

      // Draw Family Member blips
      state.familyMembers.forEach(member => {
        const memberRadius = (member.distKm / 15) * maxRadius;
        const radAngle = (member.angle * Math.PI) / 180;
        const bx = cx + Math.cos(radAngle) * memberRadius;
        const by = cy + Math.sin(radAngle) * memberRadius;

        let color = '#10b981';
        if (member.status === 'danger') {
          color = '#ef4444';
          // Flashing danger pulse
          const pulse = (Math.sin(Date.now() / 150) + 1) * 3;
          ctx.beginPath();
          ctx.arc(bx, by, 7 + pulse, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(239, 68, 68, 0.3)';
          ctx.fill();
        } else if (member.status === 'offline') {
          color = '#64748b';
        }

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(bx, by, 5, 0, Math.PI * 2);
        ctx.fill();

        // Label
        ctx.fillStyle = '#e2e8f0';
        ctx.font = '10px Plus Jakarta Sans, sans-serif';
        const nameText = state.lang === 'bn' ? member.nameBn.split(' ')[0] : member.name.split(' ')[0];
        ctx.fillText(`${nameText} (${member.distKm}km)`, bx + 8, by + 3);
      });

      requestAnimationFrame(drawRadar);
    }

    drawRadar();
    renderFamilyList();

    if (safeToggleBtn) {
      safeToggleBtn.addEventListener('click', () => {
        state.isUserSafe = !state.isUserSafe;
        if (state.isUserSafe) {
          safeToggleBtn.className = 'pill-btn status-safe';
          safeText.textContent = state.lang === 'bn' ? 'সবাই নিরাপদ আছি' : 'I AM SAFE (সবাই নিরাপদ)';
          playTone(880, 'sine', 0.15, 0.1);
        } else {
          safeToggleBtn.className = 'pill-btn primary-btn';
          safeText.textContent = state.lang === 'bn' ? 'বিপদে আছি (HELP NEEDED)' : 'IN DANGER (সাহায্য প্রয়োজন)';
          playTone(400, 'sawtooth', 0.25, 0.15);
        }
      });
    }
  }

  function renderFamilyList() {
    const list = document.getElementById('familyMemberList');
    if (!list) return;

    list.innerHTML = state.familyMembers.map(m => {
      const isBn = state.lang === 'bn';
      const name = isBn ? m.nameBn : m.name;
      let badgeClass = 'emerald';
      let statusLabel = isBn ? 'নিরাপদ' : 'Safe';
      if (m.status === 'danger') {
        badgeClass = 'danger';
        statusLabel = isBn ? 'বিপদে আছে' : 'In Danger';
      } else if (m.status === 'offline') {
        badgeClass = 'amber';
        statusLabel = isBn ? 'অফলাইন' : 'Offline';
      }

      return `
        <div class="family-member-row">
          <div class="family-info">
            <div class="family-avatar">${m.status === 'danger' ? '⚠️' : '👤'}</div>
            <div>
              <strong>${name}</strong>
              <div style="font-size: 0.75rem; color: var(--text-muted);">${m.distKm} km away • Last update 2m ago</div>
            </div>
          </div>
          <span class="eyebrow-tag ${badgeClass}">${statusLabel}</span>
        </div>
      `;
    }).join('');
  }

  // ==================== SHELTERS & HOSPITALS ====================
  function initSheltersAndHospitals() {
    renderShelters();
    renderHospitals();

    const select = document.getElementById('shelterRegionSelect');
    if (select) {
      select.addEventListener('change', () => {
        renderShelters(select.value);
      });
    }

    const quickAmbulanceBtn = document.getElementById('requestAmbulanceQuickBtn');
    if (quickAmbulanceBtn) {
      quickAmbulanceBtn.addEventListener('click', () => {
        alert(
          state.lang === 'bn'
            ? 'জরুরি অ্যাম্বুলেন্স প্রেরণ অনুরোধ গ্রহণ করা হয়েছে! কন্ট্রোল রুম থেকে আপনাকে অবিলম্বে কল করা হবে।'
            : 'Emergency Ambulance dispatch requested! Control room is routing closest unit to your coordinates.'
        );
        playTone(950, 'sine', 0.2, 0.1);
      });
    }
  }

  function renderShelters(divisionFilter = 'all') {
    const container = document.getElementById('sheltersListContainer');
    const stratContainer = document.getElementById('strategicShelterGrid');
    if (!container) return;

    const filtered = divisionFilter === 'all'
      ? state.shelters
      : state.shelters.filter(s => s.division === divisionFilter);

    container.innerHTML = filtered.map(s => {
      const pct = Math.round((s.occupied / s.capacity) * 100);
      const isOverloaded = pct >= 90;
      const isBn = state.lang === 'bn';
      const name = isBn ? s.nameBn : s.name;

      let colorClass = 'green';
      let statusText = isBn ? 'পর্যাপ্ত স্থান আছে' : 'Available';
      if (pct > 75 && pct < 90) {
        colorClass = 'yellow';
        statusText = isBn ? 'দ্রুত পূর্ণ হচ্ছে' : 'Filling Fast';
      } else if (isOverloaded) {
        colorClass = 'red';
        statusText = isBn ? '৯০% পূর্ণ (রি-রুট করুন)' : '90%+ Full (Rerouted)';
      }

      return `
        <div class="shelter-item-card ${isOverloaded ? 'overload-warning' : ''}">
          <div class="item-top-row">
            <div>
              <div class="item-title">${name}</div>
              <div style="font-size: 0.75rem; color: var(--text-muted);">
                ${s.distanceKm} km away • ${s.hasLivestockPen ? '🐄 Livestock Pen' : ''} ${s.solarPower ? '☀️ Solar' : ''}
              </div>
            </div>
            <span class="eyebrow-tag ${colorClass === 'red' ? 'danger' : colorClass === 'yellow' ? 'amber' : 'emerald'}">
              ${statusText}
            </span>
          </div>

          <div class="capacity-meter-wrapper">
            <div class="capacity-labels">
              <span>Capacity: ${s.occupied} / ${s.capacity} persons</span>
              <strong>${pct}%</strong>
            </div>
            <div class="capacity-track">
              <div class="capacity-fill ${colorClass}" style="width: ${pct}%;"></div>
            </div>
          </div>

          <div class="item-actions-row">
            ${
              isOverloaded
                ? `<span style="font-size:0.75rem; color:#fca5a5;">⚠️ Rerouting to nearest open shelter</span>`
                : `<span style="font-size:0.75rem; color:#86efac;">✓ Open for instant entry</span>`
            }
            <button class="pill-btn mini-btn get-pass-btn" data-shelter-id="${s.id}">
              🎫 ${isBn ? 'ডিজিটাল পাস' : 'Get Entry Pass'}
            </button>
          </div>
        </div>
      `;
    }).join('');

    // Attach event listeners for digital entry pass
    document.querySelectorAll('.get-pass-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const shelterId = btn.dataset.shelterId;
        const shelter = state.shelters.find(s => s.id === shelterId);
        openShelterPassModal(shelter);
      });
    });

    // Populate Strategic Grid in HQ View
    if (stratContainer) {
      stratContainer.innerHTML = state.shelters.map(s => {
        const pct = Math.round((s.occupied / s.capacity) * 100);
        return `
          <div class="glass-card" style="padding:14px; margin-bottom:10px;">
            <div style="display:flex; justify-content:space-between; font-size:0.85rem; font-weight:700;">
              <span>${s.name}</span>
              <span class="${pct >= 90 ? 'text-red' : 'text-emerald'}">${pct}% Full</span>
            </div>
            <div class="capacity-track" style="margin-top:8px;">
              <div class="capacity-fill ${pct >= 90 ? 'red' : 'green'}" style="width:${pct}%;"></div>
            </div>
          </div>
        `;
      }).join('');
    }
  }

  function renderHospitals() {
    const container = document.getElementById('hospitalsListContainer');
    if (!container) return;

    const isBn = state.lang === 'bn';
    container.innerHTML = state.hospitals.map(h => {
      const name = isBn ? h.nameBn : h.name;
      return `
        <div class="hospital-item-card">
          <div class="item-top-row">
            <div>
              <div class="item-title">${name}</div>
              <div style="font-size: 0.75rem; color: var(--text-muted);">${h.distanceKm} km away • Helpline: ${h.phone}</div>
            </div>
            <span class="eyebrow-tag cyan">${h.oxygenUnits}</span>
          </div>

          <div style="display:flex; gap:16px; margin: 10px 0; font-size:0.8rem;">
            <div>ICU Beds: <strong style="color:var(--accent-cyan);">${h.icuAvailable} Available</strong></div>
            <div>ER Beds: <strong style="color:var(--accent-emerald);">${h.erBeds} Open</strong></div>
          </div>

          <div class="item-actions-row">
            <a href="tel:${h.phone.replace(/[^0-9]/g, '')}" class="pill-btn mini-btn">📞 Direct Dial</a>
            <button class="pill-btn primary-btn mini-btn dispatch-unit-btn" data-hosp="${h.name}">
              🚑 Request Transport
            </button>
          </div>
        </div>
      `;
    }).join('');

    document.querySelectorAll('.dispatch-unit-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        alert(`Dispatched emergency transport unit from: ${btn.dataset.hosp}`);
        playTone(900, 'sine', 0.15, 0.1);
      });
    });
  }

  // ==================== VOLUNTEER MISSIONS & HAZARDS ====================
  function initMissionsAndHazards() {
    renderMissions();
    renderHazards();

    const reportBtn = document.getElementById('openReportHazardModalBtn');
    const hazardModal = document.getElementById('reportHazardModal');
    const closeHazardBtn = document.getElementById('closeHazardModalBtn');
    const cancelHazardBtn = document.getElementById('cancelHazardFormBtn');
    const hazardForm = document.getElementById('hazardReportForm');

    if (reportBtn && hazardModal) {
      reportBtn.addEventListener('click', () => hazardModal.classList.remove('hidden'));
    }
    if (closeHazardBtn && hazardModal) {
      closeHazardBtn.addEventListener('click', () => hazardModal.classList.add('hidden'));
    }
    if (cancelHazardBtn && hazardModal) {
      cancelHazardBtn.addEventListener('click', () => hazardModal.classList.add('hidden'));
    }

    if (hazardForm) {
      hazardForm.addEventListener('submit', e => {
        e.preventDefault();
        const type = document.getElementById('hazardTypeInput').value;
        const loc = document.getElementById('hazardLocationInput').value;
        const desc = document.getElementById('hazardDescriptionInput').value;

        const newHazard = {
          id: `HZ-${Date.now().toString().slice(-4)}`,
          title: `${type.replace('_', ' ')}: ${desc}`,
          titleBn: desc,
          location: loc,
          votes: 1,
          reportedBy: 'You (Citizen)',
          time: 'Just now'
        };

        state.hazards.unshift(newHazard);
        renderHazards();
        hazardForm.reset();
        hazardModal.classList.add('hidden');
        alert('Hazard successfully broadcasted to regional community radar!');
        playTone(800, 'sine', 0.1, 0.08);
      });
    }
  }

  function renderMissions() {
    const container = document.getElementById('missionsListContainer');
    if (!container) return;

    container.innerHTML = state.missions.map(m => {
      const isCritical = m.severity === 'CRITICAL';
      return `
        <div class="mission-item-card">
          <div class="item-top-row">
            <div>
              <div class="item-title">${m.victimName}</div>
              <div style="font-size:0.75rem; color:var(--text-muted);">📍 ${m.location} • ${m.timestamp}</div>
            </div>
            <span class="eyebrow-tag ${isCritical ? 'danger' : 'amber'}">${m.severity}</span>
          </div>
          <p style="font-size:0.85rem; margin:8px 0; color:#e2e8f0;">${m.issue}</p>
          <div class="item-actions-row">
            <button class="pill-btn mini-btn play-audio-btn">🎙️ Play Audio Snippet</button>
            ${
              m.claimedBy
                ? `<span style="font-size:0.75rem; color:var(--accent-cyan);">Assigned: ${m.claimedBy}</span>`
                : `<button class="pill-btn primary-btn mini-btn claim-mission-btn" data-id="${m.id}">Claim Mission</button>`
            }
          </div>
        </div>
      `;
    }).join('');

    document.querySelectorAll('.claim-mission-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const mission = state.missions.find(x => x.id === btn.dataset.id);
        if (mission) {
          mission.claimedBy = 'You (Rescue Volunteer)';
          renderMissions();
          alert(`You have claimed Mission ${mission.id}! Coordinates dispatched to your mobile navigation.`);
          playTone(1000, 'sine', 0.15, 0.1);
        }
      });
    });

    document.querySelectorAll('.play-audio-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        playTone(600, 'sawtooth', 0.3, 0.1);
        setTimeout(() => playTone(800, 'sawtooth', 0.2, 0.1), 300);
        btn.textContent = '🔊 Playing Distress Audio...';
        setTimeout(() => { btn.textContent = '🎙️ Play Audio Snippet'; }, 2000);
      });
    });
  }

  function renderHazards() {
    const container = document.getElementById('hazardsListContainer');
    if (!container) return;

    const isBn = state.lang === 'bn';
    container.innerHTML = state.hazards.map(h => {
      const title = isBn && h.titleBn ? h.titleBn : h.title;
      return `
        <div class="hazard-item-card">
          <div class="item-top-row">
            <div style="flex:1;">
              <div class="item-title">${title}</div>
              <div style="font-size:0.75rem; color:var(--text-muted);">📍 ${h.location} • By ${h.reportedBy} • ${h.time}</div>
            </div>
            <div style="display:flex; align-items:center; gap:6px;">
              <button class="pill-btn mini-btn upvote-btn" data-id="${h.id}">▲ ${h.votes}</button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    document.querySelectorAll('.upvote-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const hazard = state.hazards.find(x => x.id === btn.dataset.id);
        if (hazard) {
          hazard.votes += 1;
          renderHazards();
          playTone(850, 'sine', 0.08, 0.05);
        }
      });
    });
  }

  // ==================== VOLUNTEER LEADERBOARD & CERTIFICATE ====================
  function initLeaderboard() {
    const tbody = document.getElementById('volunteerLeaderboardBody');
    const certBtn = document.getElementById('generateCertBtn');
    const certModal = document.getElementById('certificateModal');
    const closeCertBtn = document.getElementById('closeCertModalBtn');
    const printCertBtn = document.getElementById('printCertBtn');

    if (tbody) {
      tbody.innerHTML = state.volunteers.map(v => `
        <tr>
          <td><span class="rank-badge top-${v.rank}">${v.rank}</span></td>
          <td><strong>${v.name}</strong></td>
          <td>${v.district} District</td>
          <td>${v.missions}</td>
          <td><strong style="color:var(--accent-purple);">${v.xp} XP</strong></td>
          <td>${v.badges.map(b => `<span class="eyebrow-tag purple" style="margin-right:4px;">${b}</span>`).join('')}</td>
        </tr>
      `).join('');
    }

    if (certBtn && certModal) {
      certBtn.addEventListener('click', () => {
        renderCertificate();
        certModal.classList.remove('hidden');
        playTone(900, 'sine', 0.1, 0.08);
      });
    }

    if (closeCertBtn && certModal) {
      closeCertBtn.addEventListener('click', () => certModal.classList.add('hidden'));
    }

    if (printCertBtn) {
      printCertBtn.addEventListener('click', () => window.print());
    }
  }

  function renderCertificate() {
    const sheet = document.getElementById('certificateSheet');
    if (!sheet) return;

    sheet.innerHTML = `
      <div class="cert-header">
        <div style="font-size:2.2rem;">🇧🇩</div>
        <div class="cert-title">SafeBangla National Crisis Response Service</div>
        <p style="font-size:0.85rem; letter-spacing:0.1em; color:#64748b; text-transform:uppercase;">Certificate of Heroic Contribution</p>
      </div>

      <p style="font-size:0.95rem; margin-top:14px;">This official cryptographic credential honors:</p>
      <div class="cert-recipient">Tanvir Hossain (ID: VOL-88219)</div>
      <p style="font-size:0.9rem; line-height:1.6; max-width:480px; margin:0 auto; color:#334155;">
        For outstanding bravery, selfless rescue operations during the Haor Flash Floods, and logging over <strong>48 verified emergency missions</strong> with distinction.
      </p>

      <div style="margin-top:20px; font-size:0.75rem; font-family:monospace; color:#475569;">
        VERIFICATION HASH: <code>SHA256: 7f8a9e01bc34d5882afe009941bd589c3140</code>
      </div>

      <div class="cert-signature-row">
        <div>
          <strong>Director General</strong><br>
          Disaster Management Bureau
        </div>
        <div>
          <strong>Lead Architect</strong><br>
          SafeBangla Ecosystem
        </div>
      </div>
    `;
  }

  // ==================== DRONES & IOT WATER GAUGES ====================
  function initDronesAndIot() {
    renderDrones();
    renderWaterGauges();

    const floodBtn = document.getElementById('triggerFloodSimBtn');
    if (floodBtn) {
      floodBtn.addEventListener('click', () => {
        // Spike the Surma River level
        state.waterGauges[0].level += 0.35;
        state.waterGauges[0].delta = '+0.83m (SURGING)';
        renderWaterGauges();
        playSosAlarm();
        alert('⚠️ SIMULATION ALERT: Surma River gauge spiked by 35cm! Automated Flash Flood Warning broadcasted to 18,400 registered riverfront residents.');
      });
    }
  }

  function renderDrones() {
    const container = document.getElementById('droneFleetContainer');
    if (!container) return;

    container.innerHTML = state.drones.map(d => `
      <div class="drone-card-item">
        <div class="drone-header">
          <span class="drone-model">🛸 ${d.model}</span>
          <span class="eyebrow-tag ${d.status === 'IN_FLIGHT' ? 'cyan' : 'emerald'}">${d.status}</span>
        </div>
        <div style="font-size:0.8rem; margin:6px 0;"><strong>Payload:</strong> ${d.payload}</div>
        <div class="drone-telemetry-row">
          <span>Alt: ${d.altitude}</span>
          <span>Speed: ${d.speed}</span>
          <span>Battery: <strong style="color:var(--accent-emerald);">${d.battery}%</strong></span>
        </div>
        <div style="font-size:0.75rem; color:var(--text-muted); margin-top:8px;">Target: ${d.target}</div>
      </div>
    `).join('');
  }

  function renderWaterGauges() {
    const container = document.getElementById('waterGaugesContainer');
    if (!container) return;

    container.innerHTML = state.waterGauges.map(g => {
      const isDanger = g.status === 'DANGER';
      return `
        <div class="gauge-card-item">
          <div class="gauge-river-name">${g.river}</div>
          <div class="gauge-value ${isDanger ? 'text-red' : 'text-cyan'}">${g.level.toFixed(2)} m</div>
          <div class="gauge-danger-line">
            Danger Mark: <strong>${g.danger.toFixed(2)} m</strong> (${g.delta})
          </div>
          <span class="eyebrow-tag ${isDanger ? 'danger' : 'emerald'}" style="margin-top:8px;">
            ${g.status}
          </span>
        </div>
      `;
    }).join('');
  }

  // ==================== AI CRISIS CHATBOT ====================
  function initAiChatbot() {
    const openBtn = document.getElementById('openAiChatBtn');
    const modal = document.getElementById('aiChatModal');
    const closeBtn = document.getElementById('closeAiChatBtn');
    const form = document.getElementById('aiChatForm');
    const input = document.getElementById('aiChatInput');
    const historyBox = document.getElementById('chatHistoryBox');
    const chips = document.querySelectorAll('.chat-chip');

    if (openBtn && modal) {
      openBtn.addEventListener('click', () => modal.classList.remove('hidden'));
    }
    if (closeBtn && modal) {
      closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
    }

    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        const query = chip.dataset.prompt;
        sendAiMessage(query);
      });
    });

    if (form) {
      form.addEventListener('submit', e => {
        e.preventDefault();
        const text = input.value.trim();
        if (text) {
          sendAiMessage(text);
          input.value = '';
        }
      });
    }

    function sendAiMessage(userText) {
      // Append User message
      const userMsg = document.createElement('div');
      userMsg.className = 'chat-message user';
      userMsg.innerHTML = `
        <div class="msg-avatar">👤</div>
        <div class="msg-bubble"><p>${userText}</p></div>
      `;
      historyBox.appendChild(userMsg);
      historyBox.scrollTop = historyBox.scrollHeight;
      playTone(700, 'sine', 0.05, 0.05);

      // Bot thinking simulator
      const botMsg = document.createElement('div');
      botMsg.className = 'chat-message bot';
      botMsg.innerHTML = `
        <div class="msg-avatar">🤖</div>
        <div class="msg-bubble"><p><em>Analyzing crisis protocol...</em></p></div>
      `;
      historyBox.appendChild(botMsg);
      historyBox.scrollTop = historyBox.scrollHeight;

      setTimeout(() => {
        const answer = getAiCrisisKnowledge(userText);
        botMsg.querySelector('.msg-bubble').innerHTML = `<p>${answer}</p>`;
        historyBox.scrollTop = historyBox.scrollHeight;
        playTone(900, 'sine', 0.1, 0.05);
      }, 600);
    }
  }

  function getAiCrisisKnowledge(query) {
    const q = query.toLowerCase();

    if (q.includes('cyclone') || q.includes('ঘূর্ণিঝড়')) {
      return state.lang === 'bn'
        ? '<strong>ঘূর্ণিঝড় নিরাপত্তা গাইডলাইন:</strong><br>১. মহাবিপদ সংকেত পেলে কালবিলম্ব না করে নিকটস্থ সাইক্লোন শেল্টারে যান।<br>২. বিশুদ্ধ পানি, শুকনো খাবার ও প্রয়োজনীয় ওষুধ পলিথিনে মুড়িয়ে সাথে নিন।<br>৩. ঘরের গ্যাস সিলিন্ডার ও মেইন ইলেকট্রিক সুইচ বন্ধ রাখুন।<br>৪. জরুরি প্রয়োজনে ডায়াল করুন <strong>১০৯০</strong> অথবা <strong>৯৯৯</strong>।'
        : '<strong>Severe Cyclone Protocols:</strong><br>1. Evacuate immediately to designated reinforced shelters if Danger Signal 7 or higher is issued.<br>2. Carry non-perishable rations, water purification tablets, and documents in waterproof pouches.<br>3. Turn off main circuit breakers and gas mains before leaving.<br>4. Monitor BMD bulletins via <strong>1090</strong>.';
    }

    if (q.includes('flood') || q.includes('বন্যা') || q.includes('হাওর')) {
      return state.lang === 'bn'
        ? '<strong>আকস্মিক বন্যা নির্দেশিকা:</strong><br>১. হাওর বা নিম্নাঞ্চলে পানি দ্রুত বাড়লে দ্রুত উঁচু স্থান বা আশ্রয়কেন্দ্রে আশ্রয় নিন।<br>২. তীব্র স্রোতে সাঁতার কাটবেন না বা হাঁটবেন না (১৫ সেমি পানির স্রোত মানুষকে ভাসিয়ে নিতে পারে)।<br>৩. পানিতে নামার আগে বাঁশের লাঠি ব্যবহার করে গর্ত পরীক্ষা করুন।<br>৪. খাবার পানি কমপক্ষে ১০ মিনিট ফুটিয়ে বা হ্যালোজেন ট্যাবলেট ব্যবহার করে খান।'
        : '<strong>Flash Flood Safety:</strong><br>1. Move immediately to high plinth structures or designated elevated shelters.<br>2. Never attempt to drive or walk through moving floodwater (just 15cm of rapid water can sweep adults away).<br>3. Boil drinking water for 10 minutes or use water purification tablets.';
    }

    if (q.includes('snake') || q.includes('সাপ')) {
      return state.lang === 'bn'
        ? '<strong>সাপের কামড়ে করণীয় (First Aid):</strong><br>১. রোগীকে শান্ত রাখুন এবং আক্রান্ত অঙ্গ নড়াচড়া বন্ধ রাখুন (স্প্লিন্ট বাঁধুন)।<br>২. কামড়ের স্থান কাটবেন না, মুখ দিয়ে বিষ চুষবেন না এবং খুব শক্ত করে বাঁধন দেবেন না।<br>৩. দ্রুততম সময়ে সরকারি হাসপাতালে নিয়ে অ্যান্টিভেনম ইনজেকশন দিন (হটলাইন <strong>১৬২৬৩</strong>)।'
        : '<strong>Snakebite Emergency Protocol:</strong><br>1. Keep the patient calm and immobilize the affected limb using a loose splint.<br>2. DO NOT cut, suck, or apply tight tourniquets — this causes necrosis.<br>3. Rush immediately to Upazila Health Complex for Antivenom.';
    }

    if (q.includes('lightning') || q.includes('বজ্রপাত')) {
      return state.lang === 'bn'
        ? '<strong>বজ্রপাত প্রতিরোধে করণীয়:</strong><br>১. খোলা মাঠ বা জলাশয় থেকে তাৎক্ষণিক সরে পাকা ভবনের ভেতরে আশ্রয় নিন।<br>২. কোনো বড় গাছ বা বৈদ্যুতিক খুঁটির নিচে দাঁড়াবেন না।<br>৩. খোলা স্থানে থাকলে হাঁটুতে মাথা গুঁজে কুঁকড়ে বসে পড়ুন (মাটিতে শোবেন না)।'
        : '<strong>Lightning Safety Drills:</strong><br>1. Immediately take shelter in an enclosed concrete structure; avoid open agricultural fields.<br>2. Never seek shelter under isolated trees or metal poles.<br>3. If trapped in the open, crouch low on the balls of your feet with hands over ears.';
    }

    return state.lang === 'bn'
      ? 'আপনার প্রশ্নের জন্য সংশ্লিষ্ট দুর্যোগ উদ্ধার কন্ট্রোল রুম ও হেল্পলাইন <strong>৯৯৯</strong> এবং <strong>১০৯০</strong> এর সাথে সার্বক্ষণিক যোগাযোগ অব্যাহত রাখা হয়েছে।'
      : 'For specific instructions on this incident, our National Emergency Response Centers (Hotline <strong>999</strong> and <strong>1090</strong>) are standing by with live guidance.';
  }

  // ==================== DIGITAL ENTRY PASS MODAL ====================
  function openShelterPassModal(shelter) {
    const modal = document.getElementById('shelterPassModal');
    const body = document.getElementById('passModalBody');
    if (!modal || !body || !shelter) return;

    const passId = `TK-${Math.floor(1000 + Math.random() * 9000)}`;
    const isBn = state.lang === 'bn';
    const shelterName = isBn ? shelter.nameBn : shelter.name;

    body.innerHTML = `
      <div style="text-align:center; padding:10px 0;">
        <div style="font-size:0.8rem; color:var(--accent-emerald); font-weight:700;">OFFICIAL DIGITAL ADMISSION PASS</div>
        <h4 style="font-size:1.1rem; margin:6px 0;">${shelterName}</h4>
        <div style="font-size:0.75rem; color:var(--text-muted);">${shelter.division.toUpperCase()} REGION • GATE 2</div>

        <div style="margin:20px auto; width:160px; height:160px; background:#fff; border-radius:12px; padding:10px; display:flex; align-items:center; justify-content:center; box-shadow:0 0 20px rgba(16,185,129,0.3);">
          <!-- Dynamic High-Contrast SVG QR Mockup -->
          <svg viewBox="0 0 100 100" style="width:100%; height:100%;">
            <rect width="100" height="100" fill="#ffffff" />
            <rect x="10" y="10" width="25" height="25" fill="#000000" />
            <rect x="15" y="15" width="15" height="15" fill="#ffffff" />
            <rect x="18" y="18" width="9" height="9" fill="#000000" />

            <rect x="65" y="10" width="25" height="25" fill="#000000" />
            <rect x="70" y="15" width="15" height="15" fill="#ffffff" />
            <rect x="73" y="18" width="9" height="9" fill="#000000" />

            <rect x="10" y="65" width="25" height="25" fill="#000000" />
            <rect x="15" y="70" width="15" height="15" fill="#ffffff" />
            <rect x="18" y="73" width="9" height="9" fill="#000000" />

            <rect x="45" y="15" width="10" height="20" fill="#000000" />
            <rect x="40" y="45" width="20" height="20" fill="#000000" />
            <rect x="65" y="65" width="25" height="25" fill="#000000" />
            <rect x="70" y="70" width="15" height="15" fill="#ffffff" />
          </svg>
        </div>

        <div style="font-family:monospace; font-size:1.2rem; font-weight:800; letter-spacing:0.1em; color:#fff;">
          ${passId}
        </div>
        <div style="font-size:0.75rem; color:var(--text-muted); margin-top:4px;">
          Valid for 6 Family Members • Validated via HMAC-SHA256
        </div>
      </div>
    `;

    modal.classList.remove('hidden');
    playTone(850, 'sine', 0.12, 0.08);
  }

  function initModals() {
    const closePassBtn = document.getElementById('closePassModalBtn');
    const passModal = document.getElementById('shelterPassModal');

    if (closePassBtn && passModal) {
      closePassBtn.addEventListener('click', () => passModal.classList.add('hidden'));
    }
  }

})();
