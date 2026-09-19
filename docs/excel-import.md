# Import flow

The import preview endpoint accepts normalized rows or common headings such as `Txn Date`, `Money`, `Description` and `Type`. Every row is stored as valid or invalid with its error. No invalid row is silently imported. The current UI supports pasted CSV preview; XLSX parsing can be added through the same `ImportBatch` and `ImportRow` records.
