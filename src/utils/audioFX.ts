/**
 * Audio FX Controller - Fully muted per user configuration
 */

class AudioController {
  private soundEnabled: boolean = false;

  public isEnabled(): boolean {
    return false;
  }

  public toggleSound(): boolean {
    this.soundEnabled = false;
    return false;
  }

  public setSoundEnabled(_enabled: boolean) {
    this.soundEnabled = false;
  }

  public playClick() {
    // Muted
  }

  public playLaserWhoosh() {
    // Muted
  }

  public playSuccessChime() {
    // Muted
  }

  public playCountdownTone() {
    // Muted
  }
}

export const audioFX = new AudioController();
