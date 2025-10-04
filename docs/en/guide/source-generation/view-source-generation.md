---
order: -1
title: Source Generation (View)
---

# View Source Generation

Haikara generates code for the View using the [`Roslyn Source Generator`](https://docs.unity3d.com//Manual/roslyn-analyzers.html).

## Requirements

The Source Generator associates classes and their corresponding .uxml and generates source code if the following conditions are met:

- The class must belong to a clearly separated `Assembly Definition`
- It must have the [`HaikaraUI Attribute`](haikara-ui-attribute.md)
- It must implement [`IHaikaraView`](../view-classes/haikara-view.md)
- It must have the same file name and be in the same directory as the .uxml file

You must add `Haikara.Runtime.asmdef` to the `Assembly Definition References` of the asmdef containing your View class.

For example, you need to arrange files as follows:  
(The directory structure can be anything.)

```
Assets
└ Scripts
    └ Sample
        ├ Sample.asmdef
        ├ SampleViewModel.cs
        └ Views
            ├ Layout.uxml
            └ Layout.cs
```

For the above file structure, implement the class as follows:

```csharp
    [HaikaraUI]
    public partial class Layout : HaikaraViewBaseWithViewModel<SampleViewModel>
    {
    
    }
```

`HaikaraViewBaseWithViewModel` is an abstract class that implements [`IHaikaraView`](../view-classes/haikara-view.md).  
The code is generated as a `partial` class of the View class.  
In the example above, the generated code is as follows:

```
    #nullable enable
    public partial class Layout
    {
        public const string UxmlGuid = "d25cc33d0344b9a47b1860fd32f7c221";
        public override string GetGuid()
        {
            return UxmlGuid;
        }
        
        public override Haikara.Runtime.AssetReferenceMode AssetReferenceMode => Haikara.Runtime.AssetReferenceMode.Resource;
        
        protected override void InitializeComponentInternal()
        {
            ElementProperties.SortElementPropertiesByPriority();
        }
        
        private struct ElementNames
        {
            public const string FirstSampleLabel = "first-sample__label";
        }
        private struct TemplateInfoList
        {
        }
    }
    #nullable restore
```

## UxmlGuid

This is the Guid of the corresponding .uxml.  
It is used to determine the corresponding UI asset from the View class, such as in the [`View Installer`](view-installer.md) and [`UI Catalog`](ui-catalog.md).

## ElementNames

Generates a list of names set for `Visual Element` in the corresponding .uxml.  
You can specify them with `elementNameInfo` in [Bindable Property](../bindable-properties/bindable-property.md) to determine the `Visual Element` to bind to.

## TemplateInfoList

For [`Template Property`](../bindable-properties/template-property.md)  
Information about [`Template`](https://docs.unity3d.com/Manual/UIE-WritingUXMLTemplate.html) placed on .uxml is generated as follows:

```csharp
        private struct TemplateInfoList
        {
            public static readonly TemplateInfo SameVmTemplate = new TemplateInfo(
                elementName: "same-vm-template",
                viewGuid: "e6b1e3896e54450dab0f5c3865de2a1b",
                templateId: "CounterSameViewModelTemplate"
            );
            public static readonly TemplateInfo ChildVmTemplate = new TemplateInfo(
                elementName: "child-vm-template",
                viewGuid: "5e392d8c8077f6c4182c12d106691fb2",
                templateId: "CounterSub"
            );
        }
```

### TemplateInfo

- **`elementName`**  
  The name set for the Template placed on .uxml.
  Used for selecting the binding target.
- **`viewGuid`**  
  The Guid of the UI asset that is the actual Template.
- **`templateId`**  
  The id of the Template on .uxml.  
  This is the same value as the file name of the Template's .uxml.