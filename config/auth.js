module.exports = {
    
        'facebookAuth' : {
            'clientID'      : '177721872911853', // your App ID
            'clientSecret'  : 'ccddceea31442f1dc7a02e607baac1a8', // your App Secret
            'callbackURL'   : 'http://localhost:2222/auth/facebook/callback',
            'profileURL'    : 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
            'profileFields' : ['id', 'email', 'name'] // For requesting permissions from Facebook API
        },
    
        'twitterAuth' : {
            'consumerKey'       : 'your-consumer-key-here',
            'consumerSecret'    : 'your-client-secret-here',
            'callbackURL'       : 'http://localhost:8080/auth/twitter/callback'
        },
    
        'googleAuth' : {
            'clientID'      : 'your-secret-clientID-here',
            'clientSecret'  : 'your-client-secret-here',
            'callbackURL'   : 'http://localhost:8080/auth/google/callback'
        }
    
    };
    