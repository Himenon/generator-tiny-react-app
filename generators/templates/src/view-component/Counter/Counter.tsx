import * as React from "react";

interface ClassNames {
  counter?: string;
  display?: string;
  button?: string;
}

const styles: ClassNames = require("./counter.scss");

interface CounterProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  display: JSX.IntrinsicElements["p"];
  button: JSX.IntrinsicElements["button"];
}

const Counter = ({ display, button, ...props }: CounterProps) => {
  return (
    <div className={styles.counter} {...props}>
      <p className={styles.display} {...display} />
      <button className={styles.button} {...button} />
    </div>
  );
};

export { CounterProps as Props, Counter as Component };
