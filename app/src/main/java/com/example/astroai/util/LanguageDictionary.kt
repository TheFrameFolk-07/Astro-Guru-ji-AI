package com.example.astroai.util

import com.example.astroai.model.LangDef

data class LanguageDict(
    val chips: List<String>,
    val greeting: (fn: String, sign: String, nak: String, pob: String) -> String,
    val career: (fn: String, ruler: String) -> String,
    val love: (fn: String, sign: String) -> String,
    val health: (fn: String, nak: String, ruler: String) -> String,
    val saturn: (sign: String) -> String,
    val fallback: (fn: String, sign: String, ruler: String) -> String,
    val placeholder: String,
    val chartTitle: String,
    val languageLabel: String
)

object LanguageDictionary {

    val LANGUAGES = listOf(
        LangDef("en", "English", "English"),
        LangDef("hi", "हिन्दी", "Hindi"),
        LangDef("bn", "বাংলা", "Bengali"),
        LangDef("mr", "मराठी", "Marathi"),
        LangDef("te", "తెలుగు", "Telugu"),
        LangDef("ta", "தமிழ்", "Tamil"),
        LangDef("gu", "ગુજરાતી", "Gujarati"),
        LangDef("kn", "ಕನ್ನಡ", "Kannada"),
        LangDef("ml", "മലയാളം", "Malayalam"),
        LangDef("pa", "ਪੰਜਾਬੀ", "Punjabi"),
        LangDef("or", "ଓଡ଼ିଆ", "Odia"),
        LangDef("as", "অসমীয়া", "Assamese"),
        LangDef("ur", "اردو", "Urdu"),
        LangDef("sa", "संस्कृतम्", "Sanskrit"),
        LangDef("ks", "کٲشُر", "Kashmiri"),
        LangDef("kok", "कोंकणी", "Konkani"),
        LangDef("mai", "मैथिली", "Maithili"),
        LangDef("mni", "মৈতৈলোন্", "Manipuri"),
        LangDef("ne", "नेपाली", "Nepali"),
        LangDef("sd", "سنڌي", "Sindhi"),
        LangDef("sat", "ᱥᱟᱱᱛᱟᱲᱤ", "Santali"),
        LangDef("brx", "बड़ो", "Bodo"),
        LangDef("doi", "डोगरी", "Dogri")
    )

    private val en = LanguageDict(
        chips = listOf("Career & Wealth", "Marriage & Love Life", "Health Analysis", "Sade Sati Status"),
        greeting = { fn, sign, nak, pob ->
            val pobText = if (pob.isNotBlank()) ", at $pob" else ""
            "🙏 Namaste $fn ji. I am Guru Ji, your AI Master Astrologer. I see you were born under the $sign sign, in the $nak Nakshatra$pobText. Your chart holds remarkable promise. Ask me anything — career, love, health, or your Sade Sati."
        },
        career = { fn, ruler ->
            "$fn ji, with $ruler influencing your 10th house, the next 8 months favour bold career moves. Jupiter strengthens earnings — invest after the waxing moon. Avoid signing big contracts on Saturdays. 🪐"
        },
        love = { fn, sign ->
            "Your Venus is well-placed for $sign, $fn ji. A meaningful connection is indicated through a friend or family introduction. Offer white flowers on Fridays to strengthen the 7th house. ❤️"
        },
        health = { fn, nak, ruler ->
            "$fn ji, your $nak Nakshatra suggests watching digestion and stress. $ruler asks for routine — sunrise walks and warm turmeric water balance your doshas. 🌿"
        },
        saturn = { sign ->
            "Regarding Sade Sati: Saturn is in a transitional phase for $sign. It tests patience, it does not punish. Recite Hanuman Chalisa on Saturdays and donate black sesame. 🙏"
        },
        fallback = { fn, sign, ruler ->
            "$fn ji, the stars hear your question. Under $sign with $ruler as your guide, focus your intention and the path reveals itself. Ask about career, love, health, or Sade Sati. ✨"
        },
        placeholder = "Ask Guru Ji…",
        chartTitle = "Your Birth Chart",
        languageLabel = "Language"
    )

    private val hi = LanguageDict(
        chips = listOf("करियर और धन", "विवाह और प्रेम", "स्वास्थ्य विश्लेषण", "साढ़े साती स्थिति"),
        greeting = { fn, sign, nak, pob ->
            val pobText = if (pob.isNotBlank()) " में $pob पर" else ""
            "🙏 नमस्ते $fn जी। मैं गुरु जी हूँ, आपका AI ज्योतिषाचार्य। आपका जन्म $sign राशि, $nak नक्षत्र$pobText हुआ है। आपकी कुंडली अत्यंत शुभ है। करियर, प्रेम, स्वास्थ्य या साढ़े साती — कुछ भी पूछिए।"
        },
        career = { fn, ruler ->
            "$fn जी, $ruler आपके दशम भाव को प्रभावित कर रहे हैं — अगले 8 महीने साहसिक करियर निर्णयों के लिए शुभ हैं। गुरु आय को बल देंगे। शनिवार को बड़े अनुबंध न करें। 🪐"
        },
        love = { fn, sign ->
            "$fn जी, $sign राशि के लिए शुक्र अनुकूल हैं। किसी मित्र या परिवार के माध्यम से शुभ संबंध बनेगा। शुक्रवार को सफेद पुष्प अर्पित करें। ❤️"
        },
        health = { fn, nak, ruler ->
            "$fn जी, $nak नक्षत्र पाचन और तनाव पर ध्यान देने को कहता है। $ruler नियम चाहते हैं — प्रातः भ्रमण और हल्दी वाला गर्म जल दोष संतुलित करेगा। 🌿"
        },
        saturn = { sign ->
            "साढ़े साती: $sign राशि के लिए शनि संक्रमण चरण में हैं। यह धैर्य की परीक्षा है, दंड नहीं। शनिवार को हनुमान चालीसा पढ़ें और काले तिल दान करें। 🙏"
        },
        fallback = { fn, sign, ruler ->
            "$fn जी, तारे आपका प्रश्न सुन रहे हैं। $sign राशि और $ruler के मार्गदर्शन में संकल्प दृढ़ रखें। करियर, प्रेम, स्वास्थ्य या साढ़े साती पर पूछें। ✨"
        },
        placeholder = "गुरु जी से पूछें…",
        chartTitle = "आपकी जन्म कुंडली",
        languageLabel = "भाषा"
    )

    private val bn = LanguageDict(
        chips = listOf("কর্মজীবন ও সম্পদ", "বিবাহ ও প্রেম", "স্বাস্থ্য বিশ্লেষণ", "সাড়ে সাতি অবস্থা"),
        greeting = { fn, sign, nak, pob ->
            val pobText = if (pob.isNotBlank()) ", $pob-এ" else ""
            "🙏 নমস্কার $fn জি। আমি গুরু জি, আপনার AI জ্যোতিষী। আপনার জন্ম $sign রাশিতে, $nak নক্ষত্রে$pobText। আপনার কুণ্ডলী অত্যন্ত শুভ। কর্ম, প্রেম, স্বাস্থ্য বা সাড়ে সাতি — যা খুশি জিজ্ঞাসা করুন।"
        },
        career = { fn, ruler ->
            "$fn জি, $ruler আপনার দশম ভাবকে প্রভাবিত করছে — আগামী ৮ মাস সাহসী কর্মসিদ্ধান্তের পক্ষে শুভ। শনিবারে বড় চুক্তি এড়িয়ে চলুন। 🪐"
        },
        love = { fn, sign ->
            "$fn জি, $sign রাশির জন্য শুক্র অনুকূল। বন্ধু বা পরিবারের মাধ্যমে সুন্দর সম্পর্ক আসবে। শুক্রবারে সাদা ফুল নিবেদন করুন। ❤️"
        },
        health = { fn, nak, ruler ->
            "$fn জি, $nak নক্ষত্র হজম ও মানসিক চাপের দিকে নজর দিতে বলে। $ruler নিয়ম চায় — সকালে হাঁটা ও হলুদ-জল দোষ সামঞ্জস্য করবে। 🌿"
        },
        saturn = { sign ->
            "সাড়ে সাতি: $sign রাশির জন্য শনি সংক্রমণ পর্যায়ে। এটি ধৈর্যের পরীক্ষা, শাস্তি নয়। শনিবারে হনুমান চালিসা পড়ুন। 🙏"
        },
        fallback = { fn, sign, ruler ->
            "$fn জি, তারারা আপনার প্রশ্ন শুনছে। $sign ও $ruler-এর নির্দেশনায় পথ খুলে যাবে। কর্ম, প্রেম, স্বাস্থ্য বা সাড়ে সাতি নিয়ে জিজ্ঞাসা করুন। ✨"
        },
        placeholder = "গুরু জিকে জিজ্ঞাসা করুন…",
        chartTitle = "আপনার জন্মকুণ্ডলী",
        languageLabel = "ভাষা"
    )

    private val ta = LanguageDict(
        chips = listOf("தொழில் & செல்வம்", "திருமணம் & காதல்", "உடல்நலம்", "சடே சதி நிலை"),
        greeting = { fn, sign, nak, pob ->
            val pobText = if (pob.isNotBlank()) ", $pob-இல்" else ""
            "🙏 வணக்கம் $fn ஜி. நான் குரு ஜி, உங்கள் AI ஜோதிடர். நீங்கள் $sign ராசியில், $nak நட்சத்திரத்தில்$pobText பிறந்தீர்கள். உங்கள் ஜாதகம் மிகச் சிறப்பானது. தொழில், காதல், உடல்நலம் அல்லது சடே சதி — எதையும் கேளுங்கள்."
        },
        career = { fn, ruler ->
            "$fn ஜி, $ruler உங்கள் 10-ஆம் வீட்டைத் தொடுகிறார் — அடுத்த 8 மாதங்கள் தைரியமான தொழில் முடிவுகளுக்கு உகந்தவை. சனிக்கிழமைகளில் பெரிய ஒப்பந்தங்களைத் தவிர்க்கவும். 🪐"
        },
        love = { fn, sign ->
            "$fn ஜி, $sign ராசிக்கு சுக்கிரன் சாதகமாக உள்ளார். நண்பர் அல்லது குடும்பம் வழியாக நல்ல உறவு அமையும். வெள்ளிக்கிழமை வெள்ளை மலர் அர்ப்பணிக்கவும். ❤️"
        },
        health = { fn, nak, ruler ->
            "$fn ஜி, $nak நட்சத்திரம் செரிமானம் மற்றும் மன அழுத்தத்தில் கவனம் கேட்கிறது. $ruler ஒழுங்கை விரும்புகிறார் — காலை நடை, மஞ்சள் நீர் நல்லது. 🌿"
        },
        saturn = { sign ->
            "சடே சதி: $sign ராசிக்கு சனி இடைநிலைக் கட்டத்தில். இது பொறுமையின் சோதனை, தண்டனை அல்ல. சனிக்கிழமை ஹனுமான் சாலிசா ஓதுங்கள். 🙏"
        },
        fallback = { fn, sign, ruler ->
            "$fn ஜி, நட்சத்திரங்கள் உங்கள் கேள்வியைக் கேட்கின்றன. $sign மற்றும் $ruler வழிகாட்ட, பாதை தெளிவாகும். தொழில், காதல், உடல்நலம் பற்றி கேளுங்கள். ✨"
        },
        placeholder = "குரு ஜியிடம் கேளுங்கள்…",
        chartTitle = "உங்கள் ஜாதகம்",
        languageLabel = "மொழி"
    )

    private val te = LanguageDict(
        chips = listOf("వృత్తి & సంపద", "వివాహం & ప్రేమ", "ఆరోగ్య విశ్లేషణ", "సాడే సతి స్థితి"),
        greeting = { fn, sign, nak, pob ->
            val pobText = if (pob.isNotBlank()) ", ${pob}లో" else ""
            "🙏 నమస్తే $fn జీ. నేను గురు జీ, మీ AI జ్యోతిష్కుడు. మీరు $sign రాశిలో, $nak నక్షత్రంలో$pobText జన్మించారు. మీ జాతకం చాలా శుభప్రదం. వృత్తి, ప్రేమ, ఆరోగ్యం లేదా సాడే సతి — ఏదైనా అడగండి."
        },
        career = { fn, ruler ->
            "$fn జీ, $ruler మీ దశమ స్థానాన్ని ప్రభావితం చేస్తున్నారు — రాబోయే 8 నెలలు ధైర్యమైన వృత్తి నిర్ణయాలకు అనుకూలం. శనివారాల్లో పెద్ద ఒప్పందాలు వద్దు. 🪐"
        },
        love = { fn, sign ->
            "$fn జీ, $sign రాశికి శుక్రుడు అనుకూలం. స్నేహితుడు లేదా కుటుంబం ద్వారా మంచి బంధం కలుగుతుంది. శుక్రవారం తెల్ల పూలు సమర్పించండి. ❤️"
        },
        health = { fn, nak, ruler ->
            "$fn జీ, $nak నక్షత్రం జీర్ణక్రియ, ఒత్తిడిపై శ్రద్ధ కోరుతుంది. $ruler క్రమశిక్షణ కోరుతున్నారు — ఉదయపు నడక, పసుపు నీరు మేలు. 🌿"
        },
        saturn = { sign ->
            "సాడే సతి: $sign రాశికి శని పరివర్తన దశలో ఉన్నారు. ఇది సహనానికి పరీక్ష, శిక్ష కాదు. శనివారం హనుమాన్ చాలీసా పఠించండి. 🙏"
        },
        fallback = { fn, sign, ruler ->
            "$fn జీ, నక్షత్రాలు మీ ప్రశ్న వింటున్నాయి. $sign, $ruler మార్గదర్శకత్వంలో దారి తెరుచుకుంటుంది. వృత్తి, ప్రేమ, ఆరోగ్యం గురించి అడగండి. ✨"
        },
        placeholder = "గురు జీని అడగండి…",
        chartTitle = "మీ జన్మ కుండలి",
        languageLabel = "భాష"
    )

    private val mr = LanguageDict(
        chips = listOf("करिअर व संपत्ती", "विवाह व प्रेम", "आरोग्य विश्लेषण", "साडेसाती स्थिती"),
        greeting = { fn, sign, nak, pob ->
            val pobText = if (pob.isNotBlank()) ", $pob येथे" else ""
            "🙏 नमस्कार $fn जी. मी गुरु जी, तुमचा AI ज्योतिषी. तुमचा जन्म $sign राशीत, $nak नक्षत्रात$pobText झाला आहे. तुमची कुंडली अतिशय शुभ आहे. करिअर, प्रेम, आरोग्य किंवा साडेसाती — काहीही विचारा."
        },
        career = { fn, ruler ->
            "$fn जी, $ruler तुमच्या दशम स्थानावर प्रभाव टाकत आहेत — पुढील ८ महिने धाडसी करिअर निर्णयांसाठी शुभ. शनिवारी मोठे करार टाळा. 🪐"
        },
        love = { fn, sign ->
            "$fn जी, $sign राशीसाठी शुक्र अनुकूल आहे. मित्र किंवा कुटुंबामार्फत चांगले नाते जुळेल. शुक्रवारी पांढरी फुले अर्पण करा. ❤️"
        },
        health = { fn, nak, ruler ->
            "$fn जी, $nak नक्षत्र पचन व ताणाकडे लक्ष देण्यास सांगते. $ruler शिस्त मागतात — सकाळचा फेरफटका व हळदीचे कोमट पाणी उपयुक्त. 🌿"
        },
        saturn = { sign ->
            "साडेसाती: $sign राशीसाठी शनी संक्रमण टप्प्यात आहे. ही संयमाची परीक्षा आहे, शिक्षा नाही. शनिवारी हनुमान चालीसा वाचा. 🙏"
        },
        fallback = { fn, sign, ruler ->
            "$fn जी, तारे तुमचा प्रश्न ऐकत आहेत. $sign व $ruler यांच्या मार्गदर्शनात मार्ग उलगडेल. करिअर, प्रेम, आरोग्याबद्दल विचारा. ✨"
        },
        placeholder = "गुरु जींना विचारा…",
        chartTitle = "तुमची जन्मकुंडली",
        languageLabel = "भाषा"
    )

    private val gu = LanguageDict(
        chips = listOf("કારકિર્દી અને ધન", "લગ્ન અને પ્રેમ", "આરોગ્ય વિશ્લેષણ", "સાડાસાતી સ્થિતિ"),
        greeting = { fn, sign, nak, pob ->
            val pobText = if (pob.isNotBlank()) ", $pob ખાતે" else ""
            "🙏 નમસ્તે $fn જી. હું ગુરુ જી, તમારો AI જ્યોતિષી. તમારો જન્મ $sign રાશિમાં, $nak નક્ષત્રમાં$pobText થયો છે. તમારી કુંડળી ખૂબ શુભ છે. કારકિર્દી, પ્રેમ, આરોગ્ય કે સાડાસાતી — કંઈ પણ પૂછો."
        },
        career = { fn, ruler ->
            "$fn જી, $ruler તમારા દશમ ભાવને પ્રભાવિત કરે છે — આગામી ૮ મહિના હિંમતભર્યા કારકિર્દી નિર્ણય માટે શુભ. શનિવારે મોટા કરાર ટાળો. 🪐"
        },
        love = { fn, sign ->
            "$fn જી, $sign રાશિ માટે શુક્ર અનુકૂળ છે. મિત્ર કે પરિવાર દ્વારા સારો સંબંધ બંધાશે. શુક્રવારે સફેદ ફૂલ અર્પણ કરો. ❤️"
        },
        health = { fn, nak, ruler ->
            "$fn જી, $nak નક્ષત્ર પાચન અને તણાવ પર ધ્યાન માંગે છે. $ruler નિયમિતતા ઈચ્છે છે — સવારની ચાલ અને હળદરવાળું ગરમ પાણી લાભદાયી. 🌿"
        },
        saturn = { sign ->
            "સાડાસાતી: $sign રાશિ માટે શનિ સંક્રમણ તબક્કામાં છે. આ ધીરજની કસોટી છે, સજા નહીં. શનિવારે હનુમાન ચાલીસા વાંચો. 🙏"
        },
        fallback = { fn, sign, ruler ->
            "$fn જી, તારાઓ તમારો પ્રશ્ન સાંભળે છે. $sign અને $rulerના માર્ગદર્શનમાં માર્ગ ખૂલશે. કારકિર્દી, પ્રેમ, આરોગ્ય વિશે પૂછો. ✨"
        },
        placeholder = "ગુરુ જીને પૂછો…",
        chartTitle = "તમારી જન્મકુંડળી",
        languageLabel = "ભાષા"
    )

    private val kn = LanguageDict(
        chips = listOf("ವೃತ್ತಿ ಮತ್ತು ಸಂಪತ್ತು", "ವಿವಾಹ ಮತ್ತು ಪ್ರೇಮ", "ಆರೋಗ್ಯ ವಿಶ್ಲೇಷಣೆ", "ಸಾಡೇ ಸತಿ ಸ್ಥಿತಿ"),
        greeting = { fn, sign, nak, pob ->
            val pobText = if (pob.isNotBlank()) ", ${pob}ನಲ್ಲಿ" else ""
            "🙏 ನಮಸ್ತೆ $fn ಜೀ. ನಾನು ಗುರು ಜೀ, ನಿಮ್ಮ AI ಜ್ಯೋತಿಷಿ. ನೀವು $sign ರಾಶಿಯಲ್ಲಿ, $nak ನಕ್ಷತ್ರದಲ್ಲಿ$pobText ಜನಿಸಿದ್ದೀರಿ. ನಿಮ್ಮ ಜಾತಕ ಬಹಳ ಶುಭ. ವೃತ್ತಿ, ಪ್ರೇಮ, ಆರೋಗ್ಯ ಅಥವಾ ಸಾಡೇ ಸತಿ — ಏನಾದರೂ ಕೇಳಿ."
        },
        career = { fn, ruler ->
            "$fn ಜೀ, $ruler ನಿಮ್ಮ ದಶಮ ಭಾವವನ್ನು ಪ್ರಭಾವಿಸುತ್ತಿದ್ದಾರೆ — ಮುಂದಿನ 8 ತಿಂಗಳು ಧೈರ್ಯದ ವೃತ್ತಿ ನಿರ್ಧಾರಗಳಿಗೆ ಶುಭ. ಶನಿವಾರ ದೊಡ್ಡ ಒಪ್ಪಂದ ಬೇಡ. 🪐"
        },
        love = { fn, sign ->
            "$fn ಜೀ, $sign ರಾಶಿಗೆ ಶುಕ್ರ ಅನುಕೂಲ. ಸ್ನೇಹಿತ ಅಥವಾ ಕುಟುಂಬದ ಮೂಲಕ ಒಳ್ಳೆಯ ಸಂಬಂಧ. ಶುಕ್ರವಾರ ಬಿಳಿ ಹೂ ಅರ್ಪಿಸಿ. ❤️"
        },
        health = { fn, nak, ruler ->
            "$fn ಜೀ, $nak ನಕ್ಷತ್ರ ಜೀರ್ಣ ಮತ್ತು ಒತ್ತಡದ ಬಗ್ಗೆ ಎಚ್ಚರ ಹೇಳುತ್ತದೆ. $ruler ಶಿಸ್ತು ಕೇಳುತ್ತಾರೆ — ಬೆಳಗಿನ ನಡಿಗೆ, ಅರಿಶಿನ ನೀರು ಒಳ್ಳೆಯದು. 🌿"
        },
        saturn = { sign ->
            "ಸಾಡೇ ಸತಿ: $sign ರಾಶಿಗೆ ಶನಿ ಪರಿವರ್ತನಾ ಹಂತದಲ್ಲಿ. ಇದು ತಾಳ್ಮೆಯ ಪರೀಕ್ಷೆ, ಶಿಕ್ಷೆ ಅಲ್ಲ. ಶನಿವಾರ ಹನುಮಾನ್ ಚಾಲೀಸಾ ಪಠಿಸಿ. 🙏"
        },
        fallback = { fn, sign, ruler ->
            "$fn ಜೀ, ನಕ್ಷತ್ರಗಳು ನಿಮ್ಮ ಪ್ರಶ್ನೆ ಕೇಳುತ್ತಿವೆ. $sign ಮತ್ತು $ruler ಮಾರ್ಗದರ್ಶನದಲ್ಲಿ ದಾರಿ ತೆರೆಯುತ್ತದೆ. ವೃತ್ತಿ, ಪ್ರೇಮ, ಆರೋಗ್ಯದ ಬಗ್ಗೆ ಕೇಳಿ. ✨"
        },
        placeholder = "ಗುರು ಜೀಯನ್ನು ಕೇಳಿ…",
        chartTitle = "ನಿಮ್ಮ ಜನ್ಮ ಕುಂಡಲಿ",
        languageLabel = "ಭಾಷೆ"
    )

    private val ml = LanguageDict(
        chips = listOf("കരിയർ & സമ്പത്ത്", "വിവാഹം & പ്രണയം", "ആരോഗ്യ വിശകലനം", "സാഡേ സതി"),
        greeting = { fn, sign, nak, pob ->
            val pobText = if (pob.isNotBlank()) ", $pob-ൽ" else ""
            "🙏 നമസ്തേ $fn ജി. ഞാൻ ഗുരു ജി, നിങ്ങളുടെ AI ജ്യോതിഷി. നിങ്ങൾ $sign രാശിയിൽ, $nak നക്ഷത്രത്തിൽ$pobText ജനിച്ചു. നിങ്ങളുടെ ജാതകം ഏറെ ശുഭകരമാണ്. കരിയർ, പ്രണയം, ആരോഗ്യം അല്ലെങ്കിൽ സാഡേ സതി — എന്തും ചോദിക്കൂ."
        },
        career = { fn, ruler ->
            "$fn ജി, $ruler നിങ്ങളുടെ പത്താം ഭാവത്തെ സ്വാധീനിക്കുന്നു — അടുത്ത 8 മാസം ധീരമായ കരിയർ തീരുമാനങ്ങൾക്ക് അനുകൂലം. ശനിയാഴ്ച വലിയ കരാറുകൾ ഒഴിവാക്കുക. 🪐"
        },
        love = { fn, sign ->
            "$fn ജി, $sign രാശിക്ക് ശുക്രൻ അനുകൂലമാണ്. സുഹൃത്തിലൂടെയോ കുടുംബത്തിലൂടെയോ നല്ല ബന്ധം. വെള്ളിയാഴ്ച വെളുത്ത പൂക്കൾ അർപ്പിക്കുക. ❤️"
        },
        health = { fn, nak, ruler ->
            "$fn ജി, $nak നക്ഷത്രം ദഹനത്തിലും സമ്മർദ്ദത്തിലും ശ്രദ്ധ ആവശ്യപ്പെടുന്നു. $ruler ചിട്ട ആഗ്രഹിക്കുന്നു — പ്രഭാത നടത്തവും മഞ്ഞൾ വെള്ളവും നല്ലത്. 🌿"
        },
        saturn = { sign ->
            "സാഡേ സതി: $sign രാശിക്ക് ശനി പരിവർത്തന ഘട്ടത്തിലാണ്. ഇത് ക്ഷമയുടെ പരീക്ഷണമാണ്, ശിക്ഷയല്ല. ശനിയാഴ്ച ഹനുമാൻ ചാലിസ ജപിക്കുക. 🙏"
        },
        fallback = { fn, sign, ruler ->
            "$fn ജി, നക്ഷത്രങ്ങൾ നിങ്ങളുടെ ചോദ്യം കേൾക്കുന്നു. $sign-ഉം $ruler-ഉം വഴികാട്ടുമ്പോൾ വഴി തെളിയും. കരിയർ, പ്രണയം, ആരോഗ്യം ചോദിക്കൂ. ✨"
        },
        placeholder = "ഗുരു ജിയോട് ചോദിക്കൂ…",
        chartTitle = "നിങ്ങളുടെ ജാതകം",
        languageLabel = "ഭാഷ"
    )

    private val pa = LanguageDict(
        chips = listOf("ਕਰੀਅਰ ਤੇ ਧਨ", "ਵਿਆਹ ਤੇ ਪਿਆਰ", "ਸਿਹਤ ਵਿਸ਼ਲੇਸ਼ਣ", "ਸਾਢੇ ਸਾਤੀ ਸਥਿਤੀ"),
        greeting = { fn, sign, nak, pob ->
            val pobText = if (pob.isNotBlank()) " ਵਿੱਚ $pob ਵਿਖੇ" else ""
            "🙏 ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ $fn ਜੀ। ਮੈਂ ਗੁਰੂ ਜੀ ਹਾਂ, ਤੁਹਾਡਾ AI ਜੋਤਸ਼ੀ। ਤੁਹਾਡਾ ਜਨਮ $sign ਰਾਸ਼ੀ, $nak ਨਛੱਤਰ$pobText ਹੋਇਆ। ਤੁਹਾਡੀ ਕੁੰਡਲੀ ਬਹੁਤ ਸ਼ੁਭ ਹੈ। ਕਰੀਅਰ, ਪਿਆਰ, ਸਿਹਤ ਜਾਂ ਸਾਢੇ ਸਾਤੀ — ਕੁਝ ਵੀ ਪੁੱਛੋ।"
        },
        career = { fn, ruler ->
            "$fn ਜੀ, $ruler ਤੁਹਾਡੇ ਦਸਵੇਂ ਘਰ ਨੂੰ ਪ੍ਰਭਾਵਿਤ ਕਰ ਰਹੇ ਹਨ — ਅਗਲੇ 8 ਮਹੀਨੇ ਦਲੇਰ ਕਰੀਅਰ ਫੈਸਲਿਆਂ ਲਈ ਸ਼ੁਭ ਹਨ। ਸ਼ਨੀਵਾਰ ਵੱਡੇ ਸਮਝੌਤੇ ਨਾ ਕਰੋ। 🪐"
        },
        love = { fn, sign ->
            "$fn ਜੀ, $sign ਰਾਸ਼ੀ ਲਈ ਸ਼ੁੱਕਰ ਅਨੁਕੂਲ ਹੈ। ਦੋਸਤ ਜਾਂ ਪਰਿਵਾਰ ਰਾਹੀਂ ਚੰਗਾ ਰਿਸ਼ਤਾ ਬਣੇਗਾ। ਸ਼ੁੱਕਰਵਾਰ ਚਿੱਟੇ ਫੁੱਲ ਭੇਟ ਕਰੋ। ❤️"
        },
        health = { fn, nak, ruler ->
            "$fn ਜੀ, $nak ਨਛੱਤਰ ਪਾਚਨ ਤੇ ਤਣਾਅ ਵੱਲ ਧਿਆਨ ਮੰਗਦਾ ਹੈ। $ruler ਨਿਯਮ ਚਾਹੁੰਦੇ ਹਨ — ਸਵੇਰ ਦੀ ਸੈਰ ਤੇ ਹਲਦੀ ਵਾਲਾ ਪਾਣੀ ਲਾਭਦਾਇਕ। 🌿"
        },
        saturn = { sign ->
            "ਸਾਢੇ ਸਾਤੀ: $sign ਰਾਸ਼ੀ ਲਈ ਸ਼ਨੀ ਬਦਲਾਅ ਦੇ ਪੜਾਅ ਵਿੱਚ ਹੈ। ਇਹ ਸਬਰ ਦੀ ਪਰਖ ਹੈ, ਸਜ਼ਾ ਨਹੀਂ। ਸ਼ਨੀਵਾਰ ਹਨੂਮਾਨ ਚਾਲੀਸਾ ਪੜ੍ਹੋ। 🙏"
        },
        fallback = { fn, sign, ruler ->
            "$fn ਜੀ, ਤਾਰੇ ਤੁਹਾਡਾ ਸਵਾਲ ਸੁਣ ਰਹੇ ਹਨ। $sign ਤੇ $ruler ਦੀ ਅਗਵਾਈ ਵਿੱਚ ਰਾਹ ਖੁੱਲ੍ਹੇਗਾ। ਕਰੀਅਰ, ਪਿਆਰ, ਸਿਹਤ ਬਾਰੇ ਪੁੱਛੋ। ✨"
        },
        placeholder = "ਗੁਰੂ ਜੀ ਨੂੰ ਪੁੱਛੋ…",
        chartTitle = "ਤੁਹਾਡੀ ਜਨਮ ਕੁੰਡਲੀ",
        languageLabel = "ਭਾਸ਼ਾ"
    )

    private val ur = LanguageDict(
        chips = listOf("کیریئر و دولت", "شادی و محبت", "صحت کا تجزیہ", "ساڑھے ساتی"),
        greeting = { fn, sign, nak, pob ->
            val pobText = if (pob.isNotBlank()) " میں $pob پر" else ""
            "🙏 آداب $fn جی۔ میں گرو جی ہوں، آپ کا AI ماہرِ نجوم۔ آپ کی پیدائش $sign برج، $nak نچھتر$pobText ہوئی۔ آپ کا زائچہ نہایت مبارک ہے۔ کیریئر، محبت، صحت یا ساڑھے ساتی — کچھ بھی پوچھیں۔"
        },
        career = { fn, ruler ->
            "$fn جی، $ruler آپ کے دسویں گھر پر اثر ڈال رہے ہیں — اگلے 8 ماہ جرات مندانہ فیصلوں کے لیے موزوں ہیں۔ ہفتہ کو بڑے معاہدے نہ کریں۔ 🪐"
        },
        love = { fn, sign ->
            "$fn جی، $sign برج کے لیے زہرہ موافق ہے۔ دوست یا خاندان کے ذریعے اچھا رشتہ بنے گا۔ جمعہ کو سفید پھول پیش کریں۔ ❤️"
        },
        health = { fn, nak, ruler ->
            "$fn جی، $nak نچھتر ہاضمے اور ذہنی دباؤ پر توجہ چاہتا ہے۔ $ruler نظم چاہتے ہیں — صبح کی سیر اور ہلدی والا نیم گرم پانی مفید ہے۔ 🌿"
        },
        saturn = { sign ->
            "ساڑھے ساتی: $sign کے لیے زحل تبدیلی کے مرحلے میں ہے۔ یہ صبر کا امتحان ہے، سزا نہیں۔ ہفتہ کو ہنومان چالیسا پڑھیں۔ 🙏"
        },
        fallback = { fn, sign, ruler ->
            "$fn جی، ستارے آپ کا سوال سن رہے ہیں۔ $sign اور $ruler کی رہنمائی میں راستہ کھلے گا۔ کیریئر، محبت، صحت کے بارے میں پوچھیں۔ ✨"
        },
        placeholder = "گرو جی سے پوچھیں…",
        chartTitle = "آپ کا زائچہ",
        languageLabel = "زبان"
    )

    private val or = LanguageDict(
        chips = listOf("କ୍ୟାରିଅର ଓ ଧନ", "ବିବାହ ଓ ପ୍ରେମ", "ସ୍ୱାସ୍ଥ୍ୟ ବିଶ୍ଳେଷଣ", "ସାଢେ ସାତି"),
        greeting = { fn, sign, nak, pob ->
            val pobText = if (pob.isNotBlank()) ", ${pob}ରେ" else ""
            "🙏 ନମସ୍କାର $fn ଜୀ। ମୁଁ ଗୁରୁ ଜୀ, ଆପଣଙ୍କ AI ଜ୍ୟୋତିଷୀ। ଆପଣଙ୍କ ଜନ୍ମ $sign ରାଶିରେ, $nak ନକ୍ଷତ୍ରରେ$pobText ହୋଇଛି। ଆପଣଙ୍କ କୁଣ୍ଡଳୀ ଅତି ଶୁଭ। କ୍ୟାରିଅର, ପ୍ରେମ, ସ୍ୱାସ୍ଥ୍ୟ କିମ୍ବା ସାଢେ ସାତି — ଯାହା ବି ପଚାରନ୍ତୁ।"
        },
        career = { fn, ruler ->
            "$fn ଜୀ, $ruler ଆପଣଙ୍କ ଦଶମ ଭାବକୁ ପ୍ରଭାବିତ କରୁଛନ୍ତି — ଆଗାମୀ ୮ ମାସ ସାହସିକ ନିଷ୍ପତ୍ତି ପାଇଁ ଶୁଭ। ଶନିବାରରେ ବଡ଼ ଚୁକ୍ତି ଏଡ଼ାନ୍ତୁ। 🪐"
        },
        love = { fn, sign ->
            "$fn ଜୀ, $sign ରାଶି ପାଇଁ ଶୁକ୍ର ଅନୁକୂଳ। ବନ୍ଧୁ କିମ୍ବା ପରିବାର ମାଧ୍ୟମରେ ଭଲ ସମ୍ପର୍କ। ଶୁକ୍ରବାରରେ ଧଳା ଫୁଲ ଅର୍ପଣ କରନ୍ତୁ। ❤️"
        },
        health = { fn, nak, ruler ->
            "$fn ଜୀ, $nak ନକ୍ଷତ୍ର ହଜମ ଓ ଚାପ ପ୍ରତି ଧ୍ୟାନ ଦେବାକୁ କହୁଛି। $ruler ନିୟମ ଚାହାନ୍ତି — ସକାଳ ଭ୍ରମଣ ଓ ହଳଦୀ ପାଣି ଉପକାରୀ। 🌿"
        },
        saturn = { sign ->
            "ସାଢେ ସାତି: $sign ରାଶି ପାଇଁ ଶନି ପରିବର୍ତ୍ତନ ପର୍ଯ୍ୟାୟରେ। ଏହା ଧୈର୍ଯ୍ୟର ପରୀକ୍ଷା, ଦଣ୍ଡ ନୁହେଁ। ଶନିବାରରେ ହନୁମାନ ଚାଳିଶା ପାଠ କରନ୍ତୁ। 🙏"
        },
        fallback = { fn, sign, ruler ->
            "$fn ଜୀ, ତାରାମାନେ ଆପଣଙ୍କ ପ୍ରଶ୍ନ ଶୁଣୁଛନ୍ତି। $sign ଓ ${ruler}ଙ୍କ ମାର୍ଗଦର୍ଶନରେ ପଥ ଖୋଲିବ। କ୍ୟାରିଅର, ପ୍ରେମ, ସ୍ୱାସ୍ଥ୍ୟ ବିଷୟରେ ପଚାରନ୍ତୁ। ✨"
        },
        placeholder = "ଗୁରୁ ଜୀଙ୍କୁ ପଚାରନ୍ତୁ…",
        chartTitle = "ଆପଣଙ୍କ ଜନ୍ମକୁଣ୍ଡଳୀ",
        languageLabel = "ଭାଷା"
    )

    private val dicts = mapOf(
        "en" to en,
        "hi" to hi,
        "bn" to bn,
        "ta" to ta,
        "te" to te,
        "mr" to mr,
        "gu" to gu,
        "kn" to kn,
        "ml" to ml,
        "pa" to pa,
        "ur" to ur,
        "or" to or,
        "sa" to hi,
        "mai" to hi,
        "ne" to hi,
        "kok" to mr,
        "brx" to hi,
        "doi" to hi,
        "ks" to ur,
        "sd" to ur,
        "as" to bn,
        "mni" to bn,
        "sat" to hi
    )

    fun dict(code: String): LanguageDict = dicts[code] ?: en

    fun isRtl(code: String): Boolean = code == "ur" || code == "ks" || code == "sd"
}
