public class MQ2Sample {
	private static final short resolution = 5;

	public static void main(String[] args) throws InterruptedException {
		// ! [Interesting]
		short[] buffer = new short[128];

		// Attach gas sensor to A0
		upm_gas.MQ2 sensor = new upm_gas.MQ2(40);

		upm_gas.thresholdContext ctx = new upm_gas.thresholdContext();
		ctx.setAverageReading(0);
		ctx.setRunningAverage(0);
		ctx.setAveragedOver(2);

		while (true) {
			int len = sensor.getSampledWindow(2, buffer);

			if (len != 0) {
				int thresh = sensor.findThreshold(ctx, 30, buffer);
				sensor.printGraph(ctx, resolution);
				if (thresh != 0) {
					System.out.println("---Threshold reached---");
				}
			}

			Thread.sleep(1000);
		}
		// ! [Interesting]
	}
}