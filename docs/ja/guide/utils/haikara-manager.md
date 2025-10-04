---
title: Haikara Manager
---

# Haikara Manager

`Haikara Manager`は、[`UI Document`](https://docs.unity3d.com/Documentation/Manual/UIE-create-ui-document-component.html)
の初期化などに使われるMonoBehaviourの基底クラスです。  
アタッチするGameObjectには`UI Document`が必須です。  
`Awake()`内で`GetComponent<UIDocument>()`を実行します。  

## PreprocessInitialize
`Awake()`内で`Initialze()`よりも前に呼ばれます。  
`Initialize()`で呼び出す処理が依存する内容などをここに記述することができます。  
(例: `ViewInstaller.Install`や、Viewクラスのインスタンス化よりも前に呼び出したい処理)

## Initialize

`Awake()`の最後に呼ばれます。[`ViewInstaller.Install()`](../source-generation/view-installer.md)の実行や、
Customの[`UILoader`](../source-generation/ui-catalog.md)の登録などをこの中で行うことを想定しています。

## Sample Code

```csharp
public class AddressableCounterSampleHaikaraManager : HaikaraManager
    {
        protected override void PreprocessInitialize(HaikaraUIContext uiContext)
        {
            HaikaraDialogProvider.Instance.Initialize(uiContext,
                AddressableDialogRoot.UxmlGuid,
                HaikaraBackdrop.UxmlGuid
            );
        }

        protected override async void Initialize(HaikaraUIContext uiContext)
        {
            AddressableSampleViewInstaller.Install();
            CommonViewInstaller.Install();
            Haikara.Runtime.UI.ViewInstaller.Install();

            // Both the VisualTreeAsset and the StyleSheet must be registered with the CustomUILoader.
            RuntimeUICatalog.Instance.UxmlUICollection.RegisterCustomUILoader(
                new AddressablesUILoader<VisualTreeAsset>()
            );

            RuntimeUICatalog.Instance.UssUICollection.RegisterCustomUILoader(
                new AddressablesUILoader<StyleSheet>()
            );

            var counter = new AddressableCounter();
            await counter.LoadAndAddToAsync(uiDocument.rootVisualElement);
            counter.SetDataSource(new AddressableCounterViewModel(new AssetBundleCountModel()));
        }
    }
```