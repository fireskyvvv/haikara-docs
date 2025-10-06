---
title: Getting started
---

# はじめに

## 導入方法
**Unity 6000.0以降が必要です**

### UPMでのインストール (Git URL)
[Unityのドキュメント](https://docs.unity3d.com/6000.0/Documentation/Manual/upm-ui-giturl.html)を参考に次のURLを追加してください  

```
https://github.com/fireskyvvv/Haikara.git#upm
```

`Packages/manifest.json` を直接編集してインストールすることもできます。
```
{
  "dependencies": {
    ...
    "com.katen.haikara": "https://github.com/fireskyvvv/Haikara.git#upm",
    ...
  }
}
```

#### UnityPackageでのインストール
[リリース](https://github.com/fireskyvvv/Haikara/releases)ページから.unitypackageをダウンロードし、UnityEditor上で展開してください

## チュートリアル

### 1 asmdefの設定
Haikaraのインストールが完了したらまず、[`Assembly Definition`](https://docs.unity3d.com/Manual/assembly-definition-files.html)の設定を行います。  
作成した(または既存の).asmdefの`Assembly Definition References`に`Haikara.Runtime`を追加してください。

### 2 ViewModelクラスの作成
バインディングする要素の作成を行います。   
次のようにViewModelクラスを作成します。(namespaceは環境に合わせて記述してください)

```csharp
using Haikara.Runtime.ViewModel;

namespace Haikara.Samples.FirstSample.Runtime.View
{
    public class FirstSampleViewModel : ViewModelBase
    {
        [CreateProperty] public string Label { get; } = "Hello, Haikara!";        
    }
}
```
#### CreateProperty Attribute
VisualElementにバインディングさせるプロパティには [`CreateProperty Attribute`](https://docs.unity3d.com/ScriptReference/Unity.Properties.CreatePropertyAttribute.html)が必要になります。  
今回の例ではgetterのみ実装されていますが、[`BindingMode`](https://docs.unity3d.com/ScriptReference/UIElements.BindingMode.html)によってsetterが必要になります。

### 3 .csファイルと.uxmlの作成
作成した.asmdefに含まれるいずれかのフォルダに.csと.uxmlを作成してください。  
.csは `Create > Scripting > Empty C# Script`から、.uxmlは `Create > UI Toolkit > UI Document`から作成できます。  
どちらのファイルも同一の名前である必要があります。  
.csファイルが.uxmlに対するコードビハインド的に扱われます。  
Haikaraでは`Viewクラス`と呼称します。  

ここでは、`FirstSample.cs`と`FirstSample.uxml`を作成しました。  
![file-structure-sample](/assets/guide/introduction/file-structure-sample.png)

### 4 .uxmlを編集する 
データバインディングをする必要がある要素については、名前をつけてください。  
名前を付けることによって、Viewクラス側にエレメント名の一覧が生成され、安全に対象となるVisualElementの特定ができるようになります。  
次のように.uxmlの編集を行ってください。UI Builder上からの編集、.uxmlの直接編集のどちらでも問題ありません。  
![file-structure-sample](/assets/guide/introduction/ui-builder-sample.png) 

.uxmlファイル
```xml
<ui:UXML xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:ui="UnityEngine.UIElements" xmlns:uie="UnityEditor.UIElements" noNamespaceSchemaLocation="../../../../../UIElementsSchema/UIElements.xsd" editor-extension-mode="False">
    <ui:Label text="Label" name="first-sample__label" />
</ui:UXML>
```

### 5 Viewクラスを編集する
Viewクラスには次の要素が必要になります。  
- **namespace**  
元となるViewクラスと、SourceGeneratorの生成コードを1-1で紐づけるためにnamespaceが必ず必要になります。

- **partial修飾子**  
SourceGeneratorによってソースが生成されるため、Viewクラスにはpartial修飾子が必要になります。

- **HaikaraUI Attribute**  
.uxml(または.uss)のファイルに紐づくクラスであると認識させるために必要なAttributeです。  
詳細は[HaikaraUI Attribute](../source-generation/haikara-ui-attribute.md)を参照してください。  

- **HaikaraViewの継承**
VisualElementに対するバインディングを生成するために必要な継承です。  
[HaikaraViewBaseWithViewModel](../view-classes/haikara-view-base-with-view-model.md)は、ViewModelのバインディングを行うのに適した`HaikaraView`クラスです。  


Viewクラスを次のように編集してください。(namespaceは環境に合わせて記述してください)
```csharp
using Haikara.Runtime;
using Haikara.Runtime.View;

namespace Haikara.Samples.FirstSample.Runtime.View
{
    [HaikaraUI]
    public partial class FirstSample : HaikaraViewBaseWithViewModel<FirstSampleViewModel>
    {
        
    }
}
```
ここまで記述が完了すると、SourceGeneratorによってViewクラスのpartial classが生成されていることを確認できます。  
次のコードが生成されていることを確認してください。  

- {namespace}.FirstSample.g.cs
- {namespace}.ViewInstaller.g.cs

[JetBrains Rider](https://www.jetbrains.com/rider/)では[エクスプローラウィンドウ](https://pleiades.io/help/rider/Project_Tool_Window.html)から
対象のアセンブリ(csproj)内の`Dependencies`内に生成されたコードを確認できます。  
![dependenciesSample](/assets/guide/introduction/dependencies-sample.png)  

生成されたコードの内容については、[View source generation](../source-generation/view-source-generation.md) および、
[View Installer](../source-generation/view-installer.md)を参照してください。  

### 6 バインディング定義を宣言する
どのVisualElementに対して、ViewModel上のどのプロパティをバインディングするかをViewコード上で宣言します。  
Viewクラスに次の[BindableProperty](../bindable-properties/bindable-property.md)を宣言してください。
必要に応じて、`Unity.Properties`および`UnityEngine.UIElements`をusingする必要があります。  
```csharp
        private static readonly BindableProperty<Label> LabelProperty =
            BindableProperty<Label>.Create(
                bindingId: PropertyPath.FromName(nameof(Label.text)),
                dataSourcePath: PropertyPath.FromName(nameof(FirstSampleViewModel.Label)),
                elementNameInfo: ElementNames.FirstSampleLabel
            );
```

### 7 実行する
作成したUIを実際に表示するには次のような`HaikaraManager`を継承したクラスを作成します。  

```
using Haikara.Runtime;

namespace Haikara.Samples.FirstSample.Runtime
{
    public class FirstSampleManager : HaikaraManager
    {
        protected override async void Initialize(HaikaraUIContext uiContext)
        {
            var view = new View.FirstSample();
            await view.LoadAndAddToAsync(uiDocument.rootVisualElement);
            view.SetDataSource(new FirstSampleViewModel());
        }
    }
}
```

作成したクラスを適当なシーン上のUI DocumentコンポーネントがアタッチされているGameObjectにアタッチしてください。  
UI Document コンポーネントについては[こちら](https://docs.unity3d.com/6000.2/Documentation/Manual/UIE-create-ui-document-component.html)を確認してください。  
![attach-haikara-manager](/assets/guide/introduction/attach-haikara-manager.png)

Playモードを実行すると、LabelにHello,Haikara!の文字が表示されるはずです。  
ここまででHaikaraのチュートリアルは完了です。  
![first-sample-result](/assets/guide/introduction/first-sample-result.png)

## ファイル構造について
.uxmlや.ussに対応するコードを生成するには次のようなファイル構造が必要です。  

```
Assets
└ Scripts
    └ Runtime
        ├ Scripts.Runtime.asmdef
        ├ View.uxml
        └ View.cs
```

- **Scripts,Runtime**  
    フォルダ名はどんな内容でも問題ありません。

- **Scripts.Runtime.asmdef**  
    SourceGeneratorによるコード生成を行うために、.asmdefを作成する必要があります。  
    作成した`.asmdef`の`Assembly Definition References`で`Haikara.Runtime.asmdef`を参照してください。  
    尚、SourceGeneratorは`Assembly-CSharp`、`Assembly-CSharp-Editor`内のコードおよび、`Haikara.Runtime`を参照しないアセンブリのコードを無視することに注意してください。  
    
- **View.uxml,View.cs**
    Haikaraは同一アセンブリ内、同一階層、同一ファイル名(拡張子を除く)の.csと.uxml(または.uss)を対応するファイルであると認識します。  
    上記の例では`View.cs`と`View.uxml`が対応するViewファイルになります。