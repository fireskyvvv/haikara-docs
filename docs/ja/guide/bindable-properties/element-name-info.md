# ElementNameInfo

どの`Visual Element`に対してバインディングを構築するかを指定するための構造体です。  
バインディングが実行されるとき、Viewクラスに紐づく.uxmlに対して、この構造体のデータを元に`Visual Element`の探索が行われます。
`string`からの暗黙的な型変換を行うことができます。その場合、`ElementFindType`は`First`になります。

## elementName

バインディングさせる`Visual Element`の名前を指定します。
Viewクラスに対応する.uxml上の`Visual Element`の名前の一覧は
[`Element Names`](../source-generation/view-source-generation.md#elementnames)としてSourceGeneratorによって生成されます。

## index

`ElementFindType`が`Index`のときのみ使われる値です。  
同名の`Visual Element`を見つけた場合、指定したインデックスの`Visual Element`のみにバインディングします。

## ElementFindType

`Visual Element`の探索方法を決定するenumです。

### ElementFindType.First

`VisualElement.Query<T>().First`で得た`Visual Element`に対してバインディングを行います。  
`string`から型変換を行った場合の指定も`First`になります。

### ElementFindType.Index

同名の`Visual Element`が存在する場合、`index`で指定されたインデックスの`Visual Element`にバインディングを行います。

### ElementFindType.All

同名の`Visual Element`が存在する場合その全てにバインディングを行います。  