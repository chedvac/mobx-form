<div>
  <Typography className={classes.instructions}>
    {getStepContent(activeStep)}
  </Typography>
  <div>
    <Button
      disabled={activeStep === 0}
      onClick={this.handleBack}
      className={classes.button}
    >
      Back
    </Button>
    {this.isStepOptional(activeStep) && (
      <Button
        variant="contained"
        color="primary"
        onClick={this.handleSkip}
        className={classes.button}
      >
        Skip
      </Button>
    )}
    <Button
      variant="contained"
      color="primary"
      onClick={this.handleNext}
      className={classes.button}
    >
      {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
    </Button>
  </div>
</div>;
