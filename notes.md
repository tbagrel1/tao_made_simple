# Contenu de la base `Redis`

--------------------------------------------------------------------------------

## Infos codées sur l'état, impossible à exploiter à priori

### Schéma clé

    tao:state:{rdf_root}#{tt_id}_kve_de_{rdf_root}#{dpi_id}

### Exemple clé

    tao:state:http://tao.tbagrel1.com/tao_test.rdf#i15697692909141130_kve_de_http://tao.tbagrel1.com/tao_test.rdf#i15703899179515204

### Exemple valeur

    "-1\t\x01\x00\x00\x00\x00\x02\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x01\x00\x00\x01\x01\x01\x00\x01\x04\x00PT0S\r\x00not_attempted\x9e?\x9a]\x03\x01\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x01\x01\x00\x00\x01\x00\x00\x00\x00\x00\x00\xf0?\x00\x00\x00\x01\x00\x00\x00\x01\x00\x00\x00\x01\x00\x00\x00\x00\x01\x00\xff\x00\x00\x00\x01\x02\x00\x00\x00\x00\x00\x03\x00\x0e\x00tests-entree-1\x00\x01\x04\x00PT0S\n\x00testPart-1\x00\x01\x04\x00PT0S\x13\x00assessmentSection-1\x00\x01\x04\x00PT0S"

### Passage question suivante
    
Change, avec du contenu toujours incompréhensible

--------------------------------------------------------------------------------

## Infos complémentaires sur l'état, semble peu intéressant

### Schéma clé

    tao:state:{rdf_root}#{tt_id}_extra_kve_de_{rdf_root}#{dpi_id}

### Exemple clé
    tao:state:http://tao.tbagrel1.com/tao_test.rdf#i15697692909141130_extra_kve_de_http://tao.tbagrel1.com/tao_test.rdf#i15703899179515204

### Exemple valeur

```json
{'client_store_id': 'DD6AFE8D-6B4D-49EE-8F04-0E381DD256E1', 'events_queue': []}
```

### Passage question suivante

Inchangé

--------------------------------------------------------------------------------

## Timer et timeline d'un test

### Schéma clé

    tao:state:{rdf_root}#{tt_id}_timer_kve_de_{rdf_root}#{dpi_id}

    
### Exemple clé

    tao:state:http://tao.tbagrel1.com/tao_test.rdf#i15697692909141130_timer_kve_de_http://tao.tbagrel1.com/tao_test.rdf#i15703899179515204

### Exemple valeur

```json
{'consumedExtraTime': 0,
 'extendedTime': 0,
 'extraTime': 0,
 'format': 'pack',
 'timeLine': {'epoch': 1570320000,
  'index': [],
  'points': [[2, 1, 69918.655843]],
  'tags': ['item-1',
   'item-1#0',
   'assessmentSection-1',
   'testPart-1',
   'tests-entree-1',
   'item-1#0-1']},
 'version': 1}
```

### Passage question suivante

Change pour

```json
{'consumedExtraTime': 0,
 'extendedTime': 0,
 'extraTime': 0,
 'format': 'pack',
 'timeLine': {'epoch': 1570320000,
  'index': {'item-1': [0, 1, 2, 3],
   'item-1#0': [0, 1, 2, 3],
   'item-1#0-1': [0, 1, 2, 3],
   'item-2': [4, 5, 6, 7],
   'item-2#0': [4, 5, 6, 7],
   'item-2#0-1': [4, 5, 6, 7]},
  'points': [[2, 1, 69918.655843],
   [2, 2, 70208.733031],
   [1, 1, 69919.10234],
   [1, 2, 70208.286535],
   [2, 1, 70208.87097],
   [2, 2, 70219.39384],
   [1, 1, 70209.1282],
   [1, 2, 70219.13661]],
  'tags': ['assessmentSection-1', 'testPart-1', 'tests-entree-1']},
 'version': 1}
```

### Explications sur la structure

Voir documentation dans `/var/www/html/tao/taoQtiTest/models/classes/runner/time/storageFormat/QtiTimeStoragePackedFormat.php` et `/var/www/html/tao/taoTests/models/classes/runner/time/TimePoint.php`

--------------------------------------------------------------------------------

## Donne le(s) `dpi_id` associés à un *test taker* et une *delivery*

### Schéma clé

    kve_ud_{rdf_root}#{tt_id}{rdf_root}#{delivery_id}

### Exemple clé

    kve_ud_http://tao.tbagrel1.com/tao_test.rdf#i15697692909141130http://tao.tbagrel1.com/tao_test.rdf#i15697695272998159

### Exemple valeur

```json
['kve_de_http://tao.tbagrel1.com/tao_test.rdf#i15703899179515204']
```

### Passage question suivante

Inchangé

--------------------------------------------------------------------------------

## Donne le(s) `dpi_id` des *dpi* actives d'un *test taker*

### Schéma clé

    kve_ue_{rdf_root}#{tt_id}http://www.tao.lu/Ontologies/TAODelivery.rdf#DeliveryExecutionStatusActive

### Exemple clé

    kve_ue_http://tao.tbagrel1.com/tao_test.rdf#i15697692909141130http://www.tao.lu/Ontologies/TAODelivery.rdf#DeliveryExecutionStatusActive

### Exemple valeur

```json
['kve_de_http://tao.tbagrel1.com/tao_test.rdf#i15703899179515204']
```

### A la fin du test / du timer

Devient

```json
[]
```

--------------------------------------------------------------------------------

## Donne le(s) `dpi_id` des *dpi* terminées d'un *test taker*

### Schéma clé
    
    kve_ue_{rdf_root}#{tt_id}http://www.tao.lu/Ontologies/TAODelivery.rdf#DeliveryExecutionStatusFinished

### Exemple clé

    kve_ue_http://tao.tbagrel1.com/tao_test.rdf#i15697692909141130http://www.tao.lu/Ontologies/TAODelivery.rdf#DeliveryExecutionStatusFinished

### Exemple valeur

```json
['kve_de_http://tao.tbagrel1.com/tao_test.rdf#i15703899179515204']
```

### Pendant le test

N'est pas forcément présent pendant le test, apparaît que lorsque l'utilisateur a fini au moins un test

--------------------------------------------------------------------------------

## Donne les informations sur une *dpi*

### Schéma clé

    kve_de_{rdf_root}#{dpi_id}

### Exemple clé
    
    kve_de_http://tao.tbagrel1.com/tao_test.rdf#i15703899179515204

### Exemple valeur

```json
{'http://www.tao.lu/Ontologies/TAODelivery.rdf#DeliveryExecutionDelivery': 'http://tao.tbagrel1.com/tao_test.rdf#i15697695272998159',
 'http://www.tao.lu/Ontologies/TAODelivery.rdf#DeliveryExecutionStart': '0.06433800 1570389917',
 'http://www.tao.lu/Ontologies/TAODelivery.rdf#DeliveryExecutionSubject': 'http://tao.tbagrel1.com/tao_test.rdf#i15697692909141130',
 'http://www.tao.lu/Ontologies/TAODelivery.rdf#StatusOfDeliveryExecution': 'http://www.tao.lu/Ontologies/TAODelivery.rdf#DeliveryExecutionStatusActive',
 'http://www.w3.org/2000/01/rdf-schema#label': 'maths'}
```

### Après le test

Change de valeur quand le test se termine

--------------------------------------------------------------------------------

## Donne les informations sur une question répondue

### Schéma clé

    tao:state:{rdf_root}#{tt_id}_kve_de_{rdf_root}#{dpi_id}{item_label}

### Exemple clé

    tao:state:http://tao.tbagrel1.com/tao_test.rdf#i15697692909141130_kve_de_http://tao.tbagrel1.com/tao_test.rdf#i15703899179515204item-1

### Exemple valeur

```json
{'RESPONSE': {'response': {'base': {'string': '2'}}}}
```

### Si le test arrive à la fin avant d'avoir répondu

Réponse automatique "vide" insérée pour cet item

--------------------------------------------------------------------------------

