#import <React/RCTBridgeDelegate.h>
#import <UIKit/UIKit.h>
@import GoogleSignIn;

@interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate, GIDSignInDelegate>

@property (nonatomic, strong) UIWindow *window;

@end
