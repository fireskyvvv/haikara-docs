---
title: View Installer
---

# View Installer

The `View Installer` is generated once for each assembly that defines one or more View classes.  
By executing `ViewInstaller.Install()`, all View classes in the assembly are registered with the `View Provider`.  
Registered View classes can then be referenced by their [`UxmlGuid`](view-source-generation.md#UxmlGuid).

## Install

This method registers all View classes in the assembly with the `View Provider`.  
You must call this method explicitly.
If you use properties such as [`ListView Property`](../../bindable-properties/list-vew-property)
that require specifying a View class by Guid, you need to call `ViewInstaller.Install()` in advance for the assembly containing the specified View class.  
It is recommended to call `ViewInstaller.Install()` in [`HaikaraManager.Initialize()`](../haikara-manager).

## View Provider

The `View Provider` is used to retrieve View classes by their Guid.  
By calling `ViewInstaller.Install()`, all View class Guids in the installer’s assembly are registered and can be accessed.  
This is useful when you need to dynamically access Views as with [`ListView Property`](../bindable-properties/list-vew-property.md) and [`TabView Property`](../bindable-properties/tab-view-property.md), or when associating a View class with existing UI, such as a template in .uxml.  
You can also use it in combination with the [`UI Catalog`](../source-generation/ui-catalog.md).