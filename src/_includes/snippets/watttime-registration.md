### Registration

Before using the WattTime integration, you must first create a user account. This will allow you to access and use their API. Details on registering an account are available on the [WattTime website](https://www.watttime.org/api-documentation/#register-new-user).

Once you have created a WattTime account, you must set the `WATT_TIME_USER` and `WATT_TIME_PASSWORD` environment variables. This allows the Grid Intensity CLI to access the WattTime API.

```bash
export WATT_TIME_USER=your-username
export WATT_TIME_PASSWORD=your-password
```