import urllib.request
import urllib.error
import json
import time

SPACE_ID = 'gnnmt83ffjut'
ENV = 'master'
CMA_TOKEN = 'YOUR_CMA_TOKEN_HERE'
BASE = f'https://api.contentful.com/spaces/{SPACE_ID}/environments/{ENV}'


def req(method, path, data=None, extra_headers=None):
    url = f'{BASE}{path}'
    body = json.dumps(data).encode() if data else None
    headers = {
        'Authorization': f'Bearer {CMA_TOKEN}',
        'Content-Type': 'application/vnd.contentful.management.v1+json',
    }
    if extra_headers:
        headers.update(extra_headers)

    r = urllib.request.Request(url, data=body, headers=headers, method=method)
    try:
        with urllib.request.urlopen(r) as res:
            return json.loads(res.read())
    except urllib.error.HTTPError as e:
        print(f'ERROR {e.code}: {e.read().decode()[:200]}')
        return None


def create_entry(ct_id, fields):
    result = req(
        'POST',
        '/entries',
        {'fields': fields},
        {'X-Contentful-Content-Type': ct_id},
    )

    if not result:
        return None

    entry_id = result['sys']['id']
    version = result['sys']['version']
    time.sleep(0.3)
    req(
        'PUT',
        f'/entries/{entry_id}/published',
        extra_headers={'X-Contentful-Version': str(version)},
    )
    print(f'Created + published: {entry_id}')
    return entry_id


def f(val):
    return {'en-US': val}


print('\nTELC A1 - Creating Contentful Entries\n')

print('1. Exam Overview...')
create_entry(
    'examOverview',
    {
        'level': f('A1'),
        'provider': f('TELC'),
        'passMark': f('60 out of 120 points (50%)'),
        'tip': f('Each part is worth 30 points. You need at least 50% overall to pass.'),
    },
)

print('\n2. Grammar Rules...')
grammar_rules = [
    {
        'title': f('Nominativ (Subject)'),
        'rule': f('Used for the subject of the sentence. Ask: WER? (who?) or WAS? (what?)'),
        'examples': f(['Der Mann ist nett.', 'Eine Frau arbeitet hier.', 'Das Kind spielt.']),
        'tip': f('der/die/das stays unchanged in Nominativ. This is the base form.'),
        'sortOrder': f(1),
    },
    {
        'title': f('Akkusativ (Direct Object)'),
        'rule': f('Used for the direct object. Only Maskulin changes: der becomes den, ein becomes einen.'),
        'examples': f(['Ich kaufe einen Stift.', 'Ich rufe meinen Vater an.', 'Ich treffe heute meinen Bruder.']),
        'tip': f('Ask WEN? or WAS? after the verb to find the Akkusativ.'),
        'sortOrder': f(2),
    },
    {
        'title': f('Dativ (Indirect Object)'),
        'rule': f('Used for the indirect object. Used after: mit, bei, nach, seit, von, zu, aus.'),
        'examples': f(['Ich helfe meiner Mutter.', 'Ich spreche mit meiner Frau.', 'Ich fahre mit meinem Bruder.']),
        'tip': f('Ask WEM? (to whom?) to find the Dativ.'),
        'sortOrder': f(3),
    },
    {
        'title': f('Modal Verbs: muessen and duerfen'),
        'rule': f('muessen = must/have to. duerfen = may/allowed to. Main verb goes to END in infinitive.'),
        'examples': f(['Ich muss jeden Tag putzen.', 'Ich darf Kaffee machen.', 'Ich darf nicht ins Buero gehen.']),
        'tip': f('Modal verb in position 2, infinitive at the end: Ich muss um 9 Uhr arbeiten.'),
        'sortOrder': f(4),
    },
    {
        'title': f('Perfekt (Past Tense)'),
        'rule': f('Use haben or sein + Partizip II. Movement verbs use sein. Most others use haben.'),
        'examples': f(['Ich bin um 7 Uhr aufgestanden.', 'Ich habe Kaffee getrunken.', 'Ich habe gearbeitet.']),
        'tip': f('Regular verbs: ge + stem + t (kaufen = gekauft). Irregular: trinken = getrunken.'),
        'sortOrder': f(5),
    },
    {
        'title': f('Separable Verbs (Trennbare Verben)'),
        'rule': f('The prefix separates and goes to the END of the sentence in present tense.'),
        'examples': f(['Ich stehe um sieben Uhr auf.', 'Ich rufe meinen Vater an.', 'Wann faengst du an?']),
        'tip': f('In Perfekt: prefix + ge + stem: aufgestanden, angerufen, aufgeraeumt.'),
        'sortOrder': f(6),
    },
]
for rule in grammar_rules:
    create_entry('grammarRule', rule)

print('\n3. Vocabulary Items + Sets...')
vocab_data = [
    (
        'Shopping and Food',
        [
            ('der Lachs', 'salmon'),
            ('die Butter', 'butter'),
            ('die Milch', 'milk'),
            ('das Mehl', 'flour'),
            ('das Haehnchen', 'chicken'),
            ('der Reis', 'rice'),
            ('das Salz', 'salt'),
            ('die Zwiebel', 'onion'),
            ('der Joghurt', 'yoghurt'),
            ('die Dose', 'tin/can'),
            ('das Paket', 'packet'),
            ('der Pfeffer', 'pepper'),
            ('der Supermarkt', 'supermarket'),
            ('kosten', 'to cost'),
        ],
    ),
    (
        'Time and Days',
        [
            ('um sieben Uhr', 'at 7 oclock'),
            ('um halb zwei', 'at 1:30'),
            ('fuenf vor neun', 'five to nine'),
            ('am Morgen', 'morning'),
            ('am Mittag', 'noon'),
            ('am Abend', 'evening'),
            ('am Wochenende', 'at the weekend'),
            ('freitags', 'on Fridays'),
            ('gestern', 'yesterday'),
            ('dann', 'then'),
            ('danach', 'afterwards'),
            ('seit', 'since/for'),
        ],
    ),
    (
        'Family',
        [
            ('die Mutter', 'mother'),
            ('der Vater', 'father'),
            ('die Frau', 'wife/woman'),
            ('der Mann', 'husband/man'),
            ('die Schwester', 'sister'),
            ('der Bruder', 'brother'),
            ('die Familie', 'family'),
            ('der Freund', 'friend m'),
            ('die Freundin', 'friend f'),
            ('der Lehrer', 'teacher'),
        ],
    ),
    (
        'Home and Housework',
        [
            ('putzen', 'to clean'),
            ('aufraeumen', 'to tidy up'),
            ('das Haus', 'house'),
            ('das Buero', 'office'),
            ('die Kueche', 'kitchen'),
            ('joggen gehen', 'to go jogging'),
            ('kochen', 'to cook'),
            ('einkaufen', 'to shop'),
            ('fernsehen', 'to watch TV'),
            ('schlafen gehen', 'to go to sleep'),
        ],
    ),
    (
        'Work',
        [
            ('arbeiten', 'to work'),
            ('die Arbeit', 'work/job'),
            ('der Kollege', 'colleague m'),
            ('die Kollegin', 'colleague f'),
            ('die Pause', 'break'),
            ('anfangen', 'to start'),
            ('der Deutschkurs', 'German class'),
            ('die Aufgabe', 'task'),
            ('helfen', 'to help'),
            ('der Lieblingstag', 'favourite day'),
        ],
    ),
    (
        'Germany and Places',
        [
            ('die Autobahn', 'motorway'),
            ('das Tempolimit', 'speed limit'),
            ('das Gebaeude', 'building'),
            ('der Berg', 'mountain'),
            ('die Zugspitze', 'highest peak in Germany'),
            ('Muenchen', 'Munich'),
            ('Garmisch-Partenkirchen', 'Bavarian town'),
            ('das Weissbier', 'wheat beer'),
            ('der Bauernhof', 'farm'),
            ('der Park', 'park'),
        ],
    ),
]

for set_title, words in vocab_data:
    word_ids = []
    for de, en in words:
        wid = create_entry('vocabularyItem', {'de': f(de), 'en': f(en)})
        if wid:
            word_ids.append({'sys': {'type': 'Link', 'linkType': 'Entry', 'id': wid}})
        time.sleep(0.2)

    create_entry(
        'vocabularySet',
        {
            'title': f(set_title),
            'words': f(word_ids),
        },
    )
    print(f'Set created: {set_title}')

print('\n4. Speaking Prompts...')

speaking = [
    ('Work (Arbeit)', 'Wo arbeitest du?', 'Ich arbeite bei einer Firma in Berlin.'),
    ('Work (Arbeit)', 'Wie viele Stunden arbeitest du?', 'Ich arbeite acht Stunden pro Tag.'),
    ('Work (Arbeit)', 'Was machst du in der Pause?', 'In der Pause trinke ich Kaffee und esse ein Brot.'),
    ('Work (Arbeit)', 'Wann faengst du mit der Arbeit an?', 'Ich fange um neun Uhr mit der Arbeit an.'),
    ('Work (Arbeit)', 'Wie viele Kollegen hast du?', 'Ich habe viele Kollegen. Sie sind sehr nett.'),
    ('Family (Familie)', 'Hast du Geschwister?', 'Ja, ich habe eine Schwester. Sie heisst Sarah.'),
    ('Family (Familie)', 'Wie heissen deine Eltern?', 'Meine Mutter heisst Maria und mein Vater heisst Thomas.'),
    ('Family (Familie)', 'Wo wohnt deine Familie?', 'Meine Familie wohnt in Indien.'),
    ('Family (Familie)', 'Wann besuchst du deine Familie?', 'Ich besuche meine Familie im Winter.'),
    ('Daily Routine (Alltag)', 'Wann stehst du auf?', 'Ich stehe um sieben Uhr auf.'),
    ('Daily Routine (Alltag)', 'Was fruehstueckst du?', 'Ich esse Brot mit Butter und trinke Kaffee.'),
    ('Daily Routine (Alltag)', 'Was machst du am Abend?', 'Am Abend habe ich meinen Deutschkurs. Dann sehe ich fern.'),
    ('Daily Routine (Alltag)', 'Was kochst du gern?', 'Ich koche gern Pasta mit Tomatensosse.'),
    ('Shopping (Einkaufen)', 'Was kostet ein Liter Milch?', 'Ein Liter Milch kostet etwa 1,20 Euro.'),
    ('Shopping (Einkaufen)', 'Wo kaufst du ein?', 'Ich kaufe im Supermarkt ein.'),
    ('Shopping (Einkaufen)', 'Was kaufst du im Supermarkt?', 'Ich kaufe Fisch, Cola, Salz und Butter.'),
]
for cat, q, a in speaking:
    create_entry('speakingPrompt', {
        'category': f(cat),
        'question': f(q),
        'modelAnswer': f(a),
    })

print('\n5. Writing Templates...')

writing = [
    ('Einladung', 'Party-Einladung', 'Hallo Max,', 'Ich mache am Samstag eine Party.\nIch lade euch alle herzlich ein.\nDie Party beginnt um 22 Uhr und endet um 4 Uhr morgens.\nDu musst unbedingt kommen!', 'Viele Gruesse,\nMax Mueller'),
    ('Einladung', 'Geburtstagseinladung', 'Liebe Sarah,', 'Am Sonntag ist mein Geburtstag!\nIch mache eine kleine Feier zu Hause.\nDie Feier beginnt um 15 Uhr.\nIch freue mich sehr, wenn du kommst.', 'Herzliche Gruesse,\nMax Mueller'),
    ('Einladung', 'Grillabend', 'Hallo zusammen,', 'Am Freitagabend mache ich einen Grillabend im Garten.\nEs beginnt um 18 Uhr.\nBitte bringt etwas zu trinken mit.\nIch grille Haehnchen und Gemuese.', 'Bis bald,\nMax'),
    ('Einladung', 'Kinoabend', 'Hallo Julia,', 'Am Donnerstag laeuft ein neuer Film im Kino.\nIch moechte ihn gern sehen.\nHast du Lust mitzukommen?\nDer Film beginnt um 20 Uhr.', 'Liebe Gruesse,\nMax'),
    ('Absage', 'Termin absagen', 'Hallo Maria,', 'Es tut mir leid, aber ich kann heute nicht kommen.\nIch bin krank und muss zu Hause bleiben.\nKann ich einen neuen Termin bekommen?\nIch entschuldige mich fuer die Unannehmlichkeiten.', 'Mit freundlichen Gruessen,\nMax Mueller'),
    ('Absage', 'Kurs absagen', 'Sehr geehrte Damen und Herren,', 'Ich moechte meinen Deutschkurs leider absagen.\nIch habe keine Zeit mehr.\nKann ich mein Geld zurueckbekommen?\nVielen Dank fuer Ihr Verstaendnis.', 'Mit freundlichen Gruessen,\nMax Mueller'),
    ('Absage', 'Krankmeldung', 'Sehr geehrte Damen und Herren,', 'Ich bin heute krank und kann nicht zur Arbeit kommen.\nIch habe einen Arzttermin um 10 Uhr.\nIch melde mich so schnell wie moeglich zurueck.', 'Mit freundlichen Gruessen,\nMax Mueller'),
    ('Anfrage', 'Anfrage Deutschkurs', 'Sehr geehrte Damen und Herren,', 'Ich interessiere mich fuer einen Deutschkurs.\nWann beginnt der naechste Kurs?\nWie viel kostet der Kurs?\nWie viele Stunden hat der Kurs pro Woche?\nBitte senden Sie mir mehr Informationen.', 'Mit freundlichen Gruessen,\nMax Mueller'),
    ('Anfrage', 'Anfrage Hotel', 'Sehr geehrte Damen und Herren,', 'Ich moechte ein Zimmer buchen.\nIch brauche ein Zimmer fuer zwei Personen.\nVom 10. bis 14. Juli.\nWas kostet das Zimmer pro Nacht?', 'Mit freundlichen Gruessen,\nMax Mueller'),
    ('Anfrage', 'Anfrage Fitnesskurs', 'Sehr geehrte Damen und Herren,', 'Ich interessiere mich fuer einen Fitnesskurs.\nWann sind die Kurszeiten?\nWas kostet eine Mitgliedschaft pro Monat?\nGibt es eine Probestunde?', 'Mit freundlichen Gruessen,\nMax Mueller'),
    ('Beschwerde', 'Reklamation Online-Bestellung', 'Sehr geehrte Damen und Herren,', 'Ich habe bei Ihnen Socken bestellt.\nSie sind heute angekommen, aber sie waren zu klein.\nDeshalb moechte ich das Produkt zurueckschicken.\nBitte senden Sie mir mein Geld zurueck.', 'Mit freundlichen Gruessen,\nMax Mueller'),
    ('Beschwerde', 'Defekt in Wohnung', 'Sehr geehrte Damen und Herren,', 'In meiner Wohnung ist die Heizung kaputt.\nEs ist sehr kalt in der Wohnung.\nBitte reparieren Sie die Heizung so schnell wie moeglich.\nIch warte auf Ihre Antwort.', 'Mit freundlichen Gruessen,\nMax Mueller'),
    ('Beschwerde', 'Verspaetete Lieferung', 'Sehr geehrte Damen und Herren,', 'Ich habe vor zwei Wochen ein Paket bestellt.\nDas Paket ist noch nicht angekommen.\nBitte teilen Sie mir mit, wo mein Paket ist.\nIch warte auf Ihre schnelle Antwort.', 'Mit freundlichen Gruessen,\nMax Mueller'),
    ('Mitteilung', 'Adressaenderung', 'Hallo,', 'Ich moechte Ihnen mitteilen, dass ich umgezogen bin.\nMeine neue Adresse ist: Musterstrasse 5, 10115 Berlin.\nBitte senden Sie alle Briefe an die neue Adresse.', 'Vielen Dank,\nMax Mueller'),
    ('Mitteilung', 'Neuer Job', 'Liebe Kollegen,', 'Ich moechte euch mitteilen, dass ich eine neue Stelle habe.\nAb dem 1. September arbeite ich bei einer neuen Firma.\nIch freue mich sehr auf die neue Herausforderung.', 'Viele Gruesse,\nMax'),
    ('Glueckwunsch', 'Geburtstagswuensche', 'Liebe Mutter,', 'Herzlichen Glueckwunsch zum Geburtstag!\nIch wuensche dir alles Gute und viel Gesundheit.\nIch denke heute besonders an dich.\nIch rufe dich heute Abend an.', 'In Liebe,\nMax'),
    ('Glueckwunsch', 'Bestandene Pruefung', 'Lieber Freund,', 'Herzlichen Glueckwunsch! Du hast die Pruefung bestanden!\nIch bin sehr stolz auf dich.\nDas hast du wirklich gut gemacht.\nWir muessen das feiern!', 'Viele Gruesse,\nMax'),
    ('Glueckwunsch', 'Neujahr', 'Liebe Familie,', 'Ich wuensche euch ein frohes neues Jahr!\nBleibt gesund und gluecklich.\nIch freue mich, euch bald zu sehen.\nAlles Gute fuer das neue Jahr!', 'Herzliche Gruesse,\nMax'),
]

for cat, title, greeting, body, closing in writing:
    create_entry(
        'writingTemplate',
        {
            'title': f(title),
            'category': f(cat),
            'greeting': f(greeting),
            'body': f(body),
            'closing': f(closing),
        },
    )

print('\nAll entries created and published!')
print('Go to app.contentful.com to see them.')
print('Your site will update in 60 seconds.')
