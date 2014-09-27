package carbonfive;

public class Goooal {
  public static void main(String[] args) {
    validate( g("al").equals("gal") );
    validate( g().o("al").equals("goal") );
    System.out.println();
  }

  private static void validate(boolean b) {
    System.out.print(b ? '.' : 'F');
  }

  private static String g(String s) {
    return "g" + s;
  }

  private static G g() {
    G g = (memo) -> {
      return memo;
    };
    return g;
  }

  private interface G {
    public abstract G o(String memo);
  }
}
