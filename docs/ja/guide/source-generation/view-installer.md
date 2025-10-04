---
title: View Installer
---

# View Installer

`View Installer`はViewクラスが1つ以上定義されているアセンブリ上に1つ生成されます。  
`ViewInstaller.Install()`を実行することで、アセンブリ内のすべてのViewクラスを`View Provider`
に登録します。  
登録されたViewクラスは[`UxmlGuid`](view-source-generation.md#UxmlGuid)から呼び出すことができるようになります。

## Install

アセンブリ内のすべてのViewクラスを`View Provider`に登録する処理を実行するメソッドです。  
このメソッドは明示的に呼び出す必要があります。
[`ListView Property`](../../bindable-properties/list-vew-property)など、ViewクラスをGuidで指定する必要があるプロパティを使用する場合、指定したViewクラスが所属するアセンブリの
`ViewInstaller.Install()`を事前に呼ぶ必要があります。  
`ViewInstaller.Install()`をの呼び出しは、通常、[`HaikaraManager.Initialize()`](../haikara-manager)で実行されることが推奨されます。

## View Provider