# Starptautiskais valodas pārvaldība (i18n) ar AI jaudīgu valodu modeli

Izveidojiet pilnībā pielāgojamu **Starptautiskas valodas rīku saturam izveidošanai un tulkošanai**. Šajā projektā ir iebūvēta MD un MDX failu atbalsts demonstrācijas nolūkos. Parastais marķējums tiek izmantots, lai veidotu teksta saturu ar daudz teksta, piemēram, bloga ierakstiem un dokumentācijai. Cits bieži lietotais faila paplašinājums ir JSON, lai importētu un eksportētu saturu bez galvenes saturu pārvaldības sistēmām.

## Bulk satura rediģēšana uzreiz

Galvenais problēma ar bulk satura veidošanu ir plānošana **kā ieviest tulkojumus** ar esošo satura pārvaldības sistēmu ierobežojumiem.

**Izveidojot tīmekļa lietotni, kas atbalsta vairāku valodu kontekstu** ar speciāli izveidotām risinājumiem, izmantoti [Astro JS](https://docs.astro.build/en/getting-started/), Remirror un Storybook, ļauj ātri un efektīvi veikt procesus.

Mono-repozitorijs ar pilnvarotu rediģēšanu, izmantojot [Visual Studio Code](https://code.visualstudio.com/) un [yarn darbvietaas](https://classic.yarnpkg.com/lang/en/docs/workspaces/), integrējot ar failu sistēmu, var veikt simtiem failu izmaiņu ar vienu meklēšanas un aizstāšanas paraugu. Tas ļauj izveidot vairākus pakotņus tā, lai **automatizētu attīstības darba plūsmu** un darbinātu **vienas komandas instalēšanu un pārvaldīšanu** visiem tiem vienu reizi.

[Satura kolekcijas](https://docs.astro.build/en/guides/content-collections/) palīdz organizēt saturu, validēt frontmatter informāciju, vietnes priekšējo saturu un automātiski nodrošināt TypeScript atbalstu, strādājot ar saturu.

## Colaborative editing un tā attīstība

Otrais problēma, pārvaldot tulkojumu saturu, ir **colaborative editing** efektivitāte un dažādu lomu piešķiršana satura radīšanai, pārskatiem, kā arī tulkojumu precizitātes un kvalitātes validēšanai.

Colaborative editing ir kontrolēts process, kas ļauj pārvērst tulkojumus failos **atbalstītajos publicēšanas formātos**. Tomēr, lai iepriekš nepublicētais saturs tiktu priekšskatīts kopā ar visām tā sastāvdaļām, failiem jābūt **lasāmiem pārlūkprogrammas** ietvaros, pievienojot papildu slāni attīstības procesam.

HTML bagātā teksta redaktori, piemēram, Remirror, integrē [Prosemirror](https://prosemirror.net/) un TypeScript parasto rīku komplektā pasteidz tekstveida redaktoru veidošanu. [Remirror](https://remirror.io/docs) nodrošina paplašinājumus, kas abstrahē no dažādiem ProseMirror konceptiem, piemēram, shēmām, komandām un spraudņiem, padarot daudz vienkāršāku **paplašinājumu veidošanu** un **savienojot vizuālo rediģēšanu ar GUI elementiem**.

Editēšana ar bagātā teksta redaktori ļauj veikt **collaborative editing priekšskatījumus, rediģēšanu, kopēšanu un ielīmēšanu, atsaukšanu atpakaļ** vai pārvietot jau formatētus bagātā teksta elementus pa tīmekli. Tomēr darbs ar tekstu ir tikpat svarīgs, piemēram, izcelot svarīgus fragmentus ar krāsu, fontu stilu vai pievienot komentārus, pārskatot rakstus.

## **Automatizētas darba plūsmas**

Bulk editēšanas satura radīšana vienmēr ir saistīta ar **lietotāja saskarni**, kas kļūst sarežģītāka vairākos virzienos - viens ir visu vienā satura pārvaldības sistēmas saskarne, kas kontrolē domēnu. Otrs ir spoguļojošs avota koda platforma, domēna adapteris vai klase, kas iesaiņo domēnu un nodrošina papildu metodes, lai uzlabotu testējamību.

Storybook ir iepakots kā neliels, tikai attīstībai paredzēts, [darbnīcu](https://bradfrost.com/blog/post/a-frontend-workshop-environment/) vide, kas pastāv kopā ar jūsu lietotni. Tas nodrošina izolētu ietvaru, lai renderētu komponentes **bez iejaukšanās no lietotnes biznesa loģikas un konteksta**. Šādi rīki palīdz attīstības komandām vizualizēt komponentes un veidot veidnes un pārstāvētājlapas ārpus lietotnes vides.

Storybook galvenokārt ir zināms kā **Dizaina sistēmas darbnīca**. Veidojot detaļotas UI komponentu variācijas, dizaineri, inženieri un komandas sadarbojoties izmanto šos stāstus **programmatūras attīstībai, testēšanai un dokumentācijai**, un tomēr to var integrēt ar citiem jaudīgiem rīkiem starptautiskai valodas pārvaldībai un testēšanai.