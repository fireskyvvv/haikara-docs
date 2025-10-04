---
title: Haikara Manager
---

# Haikara Manager

`Haikara Manager` is a base MonoBehaviour class used for initializing the [`UI Document`](https://docs.unity3d.com/Documentation/Manual/UIE-create-ui-document-component.html).
A `UI Document` is required on the attached GameObject.
`GetComponent<UIDocument>()` is executed in `Awake()`.

## PreprocessInitialize
Called in `Awake()` before `Initialize()`.
You can describe processes here that must be executed before those in `Initialize()` (e.g., `ViewInstaller.Install` or anything that should run before instantiating View classes).

## Initialize

Called at the end of `Awake()`. You are expected to execute things like [`ViewInstaller.Install()`](../source-generation/view-installer.md) or register custom [`UILoader`](../source-generation/ui-catalog.md) here.

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