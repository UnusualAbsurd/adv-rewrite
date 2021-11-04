# ADV Bot Rewrite
### This is how you want to copy my bot 😎

## Package Setup

### Copy my github repo
```
git clone https://github.com/UnusualAbsurd/adv-rewrite
```

### Enter Folder
```
cd adv-rewrite
```

### Install Packages
```
npm i
```

## Settings Setup

### Environment Variable

> Change `example.env` to `.env` and then enter the values below
```env
token= DISCORD_BOT_TOKEN
mongodb= MONGODB_SRV
cx= GOOGLE_CX_KEY
google= GOOGLE_JSON_API_KEY
```

> Change `config.example.json` to `config.json` and then enter the values below
> Changes: `TEST_SERVER_ID` : Discord Test Server || `DISCORD_BOT_ID`: ID of your application
```json
{
    "testGuild": "TEST_SERVER_ID",
    "invite": {
        "default": "https://discord.com/api/oauth2/authorize?client_id=DISCORD_BOT_ID&permissions=535750376663&scope=bot%20applications.commands",
        "admin": "https://discord.com/api/oauth2/authorize?client_id=DISCORD_BOT_ID&permissions=8&scope=bot%20applications.commands"
    }
}
```

