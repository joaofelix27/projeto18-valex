
# Description

Valex simulates an API that manages a benefit card, generally made available by companies to their employees.

</br>

## Features

-   Create cards
-   Activate cards
-   Block / Unblock cards
-   Get the card balance with its transactions and recharges details
-   Recharge cards
-   Use the cards to make payments

</br>

## API Reference

### Create a card

```http
POST /card/create
```

#### Request:

| Body         | Type     | Description                              |
| :------------| :------- | :--------------------------------------- |
| `employeeId` | `integer`| **Required**. employee Id                |
| `type`       | `string` | **Required**. type of card               |

`Valid  card types: [groceries, restaurant, transport, education, health]`

####

| Headers     | Type     | Description           |
| :---------- | :------- | :-------------------- |
| `x-api-key` | `string` | **Required**. api key |

####

#

### Activate a card

```http
POST /card/activate
```

#### Request:

| Body             | Type     | Description                        |
| :--------------- | :------- | :--------------------------------- |
| `cardId`         | `integer`| **Required**. card Id              |
| `password`       | `string` | **Required**. card password        |
| `cardCVC`   | `string` | **Required**. card cvv             |

`Requirements:`

`The password must have exact 4 numbers`

`The Card CVC must have exact 3 numbers`

#

### Block a card

```http
POST /card/block
```

#### Request:

| Body             | Type     | Description                        |
| :--------------- | :------- | :--------------------------------- |
| `cardId`         | `integer`| **Required**. card Id              |
| `password`       | `string` | **Required**. card password        |

#

### Unlock a card

```http
POST /card/unlock
```

#### Request:

| Body             | Type     | Description                        |
| :--------------- | :------- | :--------------------------------- |
| `cardId`         | `integer`| **Required**. card Id              |
| `password`       | `string` | **Required**. card password        |

#

### Get card balance

```http
POST /balance
```

#### Request:

| Body     | Type      | Description           |
| :---------- | :-------- | :-------------------- |
| `cardId` | `integer` | **Required**. card Id |

#

### Recharge a card

```http
POST /recharges
```

#### Request:

| Headers     | Type     | Description           |
| :---------- | :------- | :-------------------- |
| `x-api-key` | `string` | **Required**. api key |

####

| Body             | Type      | Description                        |
| :--------------- | :-------- | :--------------------------------- |
| `cardId`         | `integer` | **Required**. card Id              |
| `recharge`       | `integer` | **Required**. recharge amount      |

#

### Card payments

```http
POST /purchase
```
#### Request:

| Body             | Type      | Description                        |
| :--------------- | :-------- | :--------------------------------- |
| `cardId`         | `integer` | **Required**. card Id              |
| `businessId`     | `integer` | **Required**. card expiration date |
| `password`       | `string`  | **Required**. card password        |
| `amount`         | `integer` | **Required**. purchase price       |

#

```http
POST /purchase/online
```

#### Request:

| Body             | Type      | Description                        |
| :--------------- | :-------- | :--------------------------------- |
| `name`           | `string`  | **Required**. name in card         |
| `number`         | `string`  | **Required**. card number          |
| `expirationDate` | `string`  | **Required**. card expiration date |
| `cardCVC`        | `string`  | **Required**. card CVV             |
| `businessId`     | `integer` | **Required**. card expiration date |
| `price `         | `integer` | **Required**. purchase price       |

`Expiration Date Format: "MM/YY"`

#

## Environment Variables

`DATABASE_URL = postgres://UserName:Password@Hostname:5432/DatabaseName`

`PORT = `


</br>



#
