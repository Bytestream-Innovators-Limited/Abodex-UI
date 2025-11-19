/**
 * Props for the SignupForm component.
 * @property {string} [className] - Optional CSS class name to customize the component.
 * @property {React.ComponentProps<"div">} [props] - Additional HTML div props.
 */
interface SignupFormProps extends React.ComponentProps<"div"> {
    className?: string;
}

/**
 * Props for the LoginForm component.
 * @property {string} [className] - Optional CSS class name to customize the component.
 * @property {React.ComponentProps<"div">} [props] - Additional HTML div props.
 */
interface LoginFormProps extends React.ComponentProps<"div"> {
    className?: string;
}