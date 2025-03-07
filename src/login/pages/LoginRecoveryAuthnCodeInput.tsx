import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { clsx } from "keycloakify/tools/clsx";

export default function LoginRecoveryAuthnCodeInput(
    props: PageProps<
        Extract<
            KcContext,
            {
                pageId: "login-recovery-authn-code-input.ftl";
            }
        >,
        I18n
    >
) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { url, messagesPerField, recoveryAuthnCodesInputBean } = kcContext;

    const { msg, msgStr } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={msg("auth-recovery-code-header")}
            displayMessage={!messagesPerField.existsError("recoveryCodeInput")}
        >
            <form id="kc-recovery-code-login-form" className={kcClsx("kcFormClass")} action={url.loginAction} method="post">
                <div className={kcClsx("kcFormGroupClass")}>
                    <div className={kcClsx("kcLabelWrapperClass")}>
                        <label htmlFor="recoveryCodeInput" className={kcClsx("kcLabelClass")}>
                            {msg("auth-recovery-code-prompt", `${recoveryAuthnCodesInputBean.codeNumber}`)}
                        </label>
                    </div>
                    <div className={kcClsx("kcInputWrapperClass")}>
                        <input
                            tabIndex={1}
                            id="recoveryCodeInput"
                            name="recoveryCodeInput"
                            aria-invalid={messagesPerField.existsError("recoveryCodeInput")}
                            autoComplete="off"
                            type="text"
                            className={clsx(
                                kcClsx("kcInputClass"),
                                "block focus:outline-none border-secondary-200 mt-1 rounded-md w-full focus:ring focus:ring-primary-200 focus:border-primary-300 focus:ring-opacity-50 sm:text-sm"
                            )}
                            autoFocus
                        />
                        {messagesPerField.existsError("recoveryCodeInput") && (
                            <span
                                id="input-error"
                                className={kcClsx("kcInputErrorMessageClass")}
                                aria-live="polite"
                                dangerouslySetInnerHTML={{
                                    __html: kcSanitize(messagesPerField.get("recoveryCodeInput"))
                                }}
                            />
                        )}
                    </div>
                </div>

                <div className={kcClsx("kcFormGroupClass")}>
                    <div id="kc-form-options" className={kcClsx("kcFormOptionsWrapperClass")}>
                        <div className={kcClsx("kcFormOptionsWrapperClass")} />
                    </div>
                    <div id="kc-form-buttons" className={kcClsx("kcFormButtonsClass")}>
                        <input
                            className={clsx(
                                kcClsx("kcButtonClass", "kcButtonPrimaryClass", "kcButtonBlockClass", "kcButtonLargeClass"),
                                "rounded-md bg-primary-600 text-white focus:ring-primary-600 hover:bg-primary-700 px-4 py-2 text-sm flex justify-center relative w-full focus:outline-none focus:ring-2 focus:ring-offset-2"
                            )}
                            name="login"
                            id="kc-login"
                            type="submit"
                            value={msgStr("doLogIn")}
                        />
                    </div>
                </div>
            </form>
        </Template>
    );
}
