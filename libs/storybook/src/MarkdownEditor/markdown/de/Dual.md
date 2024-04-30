# Internationalisierung (i18n) mit KI-unterstütztem Sprachmodell

Erstellen Sie ein vollständig anpassbares **Internationalisierungstool für die Erstellung und Übersetzung digitaler Inhalte**. Dieses Projekt verfügt über integrierte MD- und MDX-Dateiunterstützung zu Demonstrationszwecken. Markdown wird häufig zur Erstellung textlastiger Inhalte wie Blog-Beiträge und Dokumentationen verwendet. Die andere gängige Dateierweiterung ist JSON zur Import und Export von Inhalten für headless Content-Management-Systeme.

## Bearbeitung umfangreicher Inhalte auf einem Blick

Das Hauptproblem bei der Erstellung umfangreicher Inhalte besteht darin, **wie Übersetzungen mit den Einschränkungen der bestehenden Content-Management-Systeme eingeführt werden sollen**.

Der Bau von Webanwendungen, die **mehrsprachige Kontexte unterstützen**, mit benutzerdefinierten Lösungen, die mit [Astro JS](https://docs.astro.build/en/getting-started/), Remirror und Storybook erstellt wurden, ermöglicht schnelle und effiziente Workflows.

Ein Mono-Repository mit leistungsstarker Bearbeitung über [Visual Studio Code](https://code.visualstudio.com/) und [yarn workspaces](https://classic.yarnpkg.com/lang/en/docs/workspaces/), das in das Dateisystem integriert ist, ermöglicht Hunderte von Dateiänderungen mit einem einzelnen Such- und Ersetzungsmuster. Es ermöglicht die Einrichtung mehrerer Pakete auf eine Weise, die es ermöglicht, den Entwicklungsworkflow zu automatisieren und **mit einem Befehl alle zu installieren und zu verwalten**.

[Content-Sammlungen](https://docs.astro.build/en/guides/content-collections/) helfen beim Organisieren von Inhalten, überprüfen Ihres Frontmatters, des Website-Vorlaufformulars und bieten automatische TypeScript-Unterstützung beim Arbeiten mit Inhalten.

## Optimierung durch gemeinsame Bearbeitung

Das zweite Problem bei der Verwaltung der übersetzten Inhalte ist die Effizienz der **gemeinsamen Bearbeitung** und die Zuweisung unterschiedlicher Rollen für die Inhaltserstellung, Überprüfungen sowie die Validierung der Genauigkeit und Qualität der Übersetzungen.

Die gemeinsame Bearbeitung muss ein kontrollierter Prozess sein, der es ermöglicht, übersetzte Dateien in die **unterstützten Veröffentlichungsformate** zu transformieren. Dennoch müssen die Dateien vorab veröffentlicht werden und mit allen Komponenten vorabbereitgestellt werden, um von Browsern lesbar zu sein und somit eine zusätzliche Schicht für die Entwicklung hinzuzufügen.

HTML-Rich-Text-Editoren wie Remirror integrieren [Prosemirror](https://prosemirror.net/) und TypeScript in ein Standard-Toolkit zur Erstellung von Rich-Text-Editoren. [Remirror](https://remirror.io/docs) bietet Erweiterungen, die verschiedene ProseMirror-Konzepte wie Schemata, Befehle und Plugins abstrahieren und es viel einfacher machen, **Erweiterungen zu erstellen** und **visuelle Bearbeitung mit UI-Elementen zu verbinden**.

Durch die Bearbeitung über Rich-Text-Editoren können Sie **gemeinsam bearbeiten, Vorschauen anzeigen, bearbeiten, kopieren und einfügen, rückgängig machen** oder bereits formatierte Rich-Text-Elemente im Web verschieben. Die Arbeit mit Text ist jedoch ebenso wichtig, beispielsweise beim Hervorheben wichtiger Textausschnitte mit Farbe, Schriftstil oder beim Hinzufügen von Kommentaren während der Artikelveprüfung.

## **Automatisierte Workflows**

Die Inhaltserstellung für die Massenbearbeitung ist immer mit der **Benutzeroberfläche** verknüpft, die in zwei Richtungen an Komplexität zunimmt: eine ist eine All-in-one-Benutzeroberfläche für das Content-Management-System, das die Domain steuert. Die zweite ist die Spiegelung der Quellcodeplattform, ein Domänenadapter oder eine Klasse, die eine Domäne umschließt und zusätzliche Methoden zur Verbesserung der Testbarkeit bereitstellt.

Storybook wird als eine kleine, ausschließlich für die Entwicklung bestimmte [Arbeitsumgebung](https://bradfrost.com/blog/post/a-frontend-workshop-environment/) verpackt, die neben Ihrer App existiert. Sie bietet eine isolierte iFrame-Umgebung zum Rendern von Komponenten **ohne Störungen von der Geschäftslogik und dem Kontext der App**. Solche Tools helfen Entwicklungsteams dabei, Komponenten zu visualisieren und Vorlagen sowie repräsentative Seiten außerhalb der Anwendungsumgebung zu erstellen.

Storybook ist hauptsächlich bekannt für **Design System-Workshops**. Durch die Erstellung granularer UI-Komponentenvariationen nutzen Designer, Entwickler und Teams im kollaborativen Modus diese Stories **für Softwareentwicklung, Tests und Dokumentation** und können dennoch mit anderen leistungsstarken Tools für Internationalisierung und Tests integriert werden.