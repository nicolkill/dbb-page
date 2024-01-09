const content = `
# The REAL implementation of Firebase Cloud Messaging on the Backend side

## Why?

If you want to implement push notifications all the firebase docs tells you that you need use 
[the new http v1.1 api](https://firebase.google.com/docs/cloud-messaging/migrate-v1) and the old one would be deprecated 
in a near future because this old api isnt generating more api keys 
([source here](https://firebase.google.com/docs/cloud-messaging/auth-server#migrate-legacy-server-keys)), so, use the 
new one its critic to new apps

If your backend isnt in the list of available api libraries or you just want to implement a direct without have all the 
another stuff that is on google apis libraries, this its your post

## Prerequisites

- [Create your project](https://firebase.google.com/docs/web/setup) on firebase console
- Go to :
  - **Project Settings**
  - **Service Accounts tab**
  - **Generate new Private key** and download the file

## The core problem

If you already seen the *[send message to multiple devices](https://firebase.google.com/docs/cloud-messaging/js/send-multiple#add_web_push_properties_to_a_notification_payload)* 
in the post to fcm api url you can see that its needed an *Bearer api token* to authorize your notification and the 
problem its here, htf! can i create an api token, what its the page and here its the hard part, isnt in any place

## Dont give me problems, give me solutions

Its simple but google wants a dude to read his docs, dont worry here's a summary, \`you need implement an jwt cycle in 
your backend and use the access token and refresh when expires\`, and yes, espires shortly, every hour exactly

the first step its, go to the **Api Credentials** tab in the 
[Cloud Console](https://console.cloud.google.com/apis/credentials) 

> Change to your project in top, its important!

Your Firebase project already has created an a OAuth2.0 client, so you just need open it and see their data, you need 2 
things

- Add this domain to the **Redirect URI's** \`https://developers.google.com/oauthplayground\`
- Copy the Client ID
- Copy the Client Secret (Still count as one!)

And **this its the secret!**, open this the [Google OAuthPlayground](https://developers.google.com/oauthplayground) 
(the same link that you add it to redirect uri's)

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/2vzhuo35qqivgme327x2.png)

#### What its this?

Its that, a playground to use OAuth2.0, check the instructions to see what its happening

In the page, open the settings panel (on your right! big gear icon) and check the box that says **"Use your own OAuth 
credentials"** and yes, here add your Client ID and Client Secret, then in the left in the bottom add the google fcm 
permission url

\`\`\`
https://www.googleapis.com/auth/firebase.messaging
\`\`\`

And click in **Authorize APIs** blue button, this will send you to a classic *auth with google* screen and you can allow 
or deny, obviously, click on allow

In the next screen all tokens its setted, just click in the **Exchange authorization code for tokens** blue button and 
will get the **access_token** and **refresh_token** (and more data) and and then will jump to the next screen, but you 
can go back, just click in this button

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/6grogycavjm3zbp18jkr.png)

Go back and press the **Refresh access token** gray button, this its your destiny, your goal request example, you just 
need save the refresh token, client id and client secret and replicate in your backend the call to the api and its all, 
now you have all to send this precious push messages from your backend in a more easy way

Here is an implementation on Elixir

\`\`\`elixir
defmodule Gooogle.Auth.Jwt do
  @tesla_client Tesla.client([
                  {Tesla.Middleware.BaseUrl, "https://oauth2.googleapis.com"},
                  Tesla.Middleware.FormUrlencoded
                ])

  defp oauth_refresh_token, do: Application.get_env(:my_app, :firebase)[:refresh_token]
  defp oauth_client_id, do: Application.get_env(:my_app, :firebase)[:oauth_client_id]
  defp oauth_client_secret, do: Application.get_env(:my_app, :firebase)[:oauth_client_secret]

  @spec refresh_token() :: map()
  def refresh_token() do
    body = %{
      client_id: oauth_client_id(),
      refresh_token: oauth_refresh_token(),
      client_secret: oauth_client_secret(),
      grant_type: "refresh_token"
    }

    %{status: 200, body: body} = Tesla.post!(@tesla_client, "/token", body)

    Jason.decode!(body)
  end
end

\`\`\`

FAQ's

- According some google docs, the refresh token **never expires**
- You can save on redis with timeout in memory or wait to another response that isnt an \`200\` and refresh in the moment

htf = how to freak

#### Other sites
- [dev.to](https://dev.to/nicolkill/the-real-implementation-of-firebase-cloud-messaging-on-the-backend-side-3iib)
`;

export default content;
